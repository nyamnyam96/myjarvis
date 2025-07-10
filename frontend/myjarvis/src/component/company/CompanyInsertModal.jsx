import { useState } from "react";
import useUserStore from "../../store/useUserStore"
import Swal from "sweetalert2";
import './CompanyInsertModal.css';
import createInstance from "../../axios/interceptor";

export default function CompanyInsertModal({closeModal, reloadCompanyList}) {
    const serverUrl = import.meta.env.VITE_BACK_SERVER;    
    const axiosInstance = createInstance();
    const [company, setCompany] = useState({        //고객사 기본 정보 state
        compName : '',
        ownerName : '',
        compTel: '',
        compNo: '',
        compAddr: '',
        compType: 'P', //법인 기본값
    });
    const [members, setMembers] = useState([]);     //담당자 목록 state
    
    //회사 정보 input 값이 바뀔때마다 실행되는 함수
    function handleCompanyChange(e){ 
        const {name, value} = e.target;
        setCompany(prev => ({...prev, [name]: value}));
    };
    
    //담당자 정보 input 값이 바뀔때마다 실행되는 함수
    function handleMemberChange(index, e){
        const { name, value } = e.target;
        const updatedMembers = [...members];
        updatedMembers[index][name] = value;
        setMembers(updatedMembers);
    };

    //담당자추가 버튼 클릭 시
    function addMemberRow(){ 
        setMembers([...members, { 
            contactName: '', 
            contactDept: '', 
            contactPosition: '', 
            contactPhone: '', 
            contactEmail: ''
        }]);
    };

    //담당자 '삭제' 버튼 클릭 시
    function removeMemberRow(index){ 
        const updateMembers = members.filter((_, i) => i !== index);
        setMembers(updateMembers);
    };

    //'등록' 버튼 클릭 시(최종 제출)
    function handleSubmit(){
        // 1. 유효성 검사
        if (company.compName == '' || company.compTel == '') {
            Swal.fire({ title: '입력 오류', text: '필수 항목(회사명, 연락처)을 모두 입력해주세요.', icon: 'warning' });
            return;
        }

        // 2. 로그인 사용자 정보 가져오기
        const {loginMember} = useUserStore.getState();

        // 3. 서버에 보낼 최종 데이터 조립하기
        const finalData = {...company,memberNo: loginMember.memberNo,companyMembers: members};

        console.log("로그인 정보 (loginMember):", loginMember);
        console.log("서버로 보낼 데이터 (finalData):", finalData);

        // 4. axios로 서버에 전송하기
        axiosInstance.post(serverUrl + "/company/join", finalData)
            .then(function(res){
                if (res.data > 0) {
                    Swal.fire({ title: '등록 성공', text: '신규 고객사가 등록되었습니다.', icon: 'success' });
                    closeModal(); // 부모가 물려준 닫기 함수 실행
                    reloadCompanyList(); // 부모가 물려준 목록 새로고침 함수 실행
                } else {
                    Swal.fire({ title: '등록 실패', text: '등록 중 문제가 발생했습니다.', icon: 'error' });
                }
            })
            .catch(function(err){
                console.error(err);
                Swal.fire({ title: '오류 발생', text: '서버 통신 중 오류가 발생했습니다.', icon: 'error' });
            });
    };

    return (
        // 모달창의 검은 배경
        <div className="modal-backdrop">
            {/* 모달창의 흰색 본체 */}
            <div className="modal-content">
                <div className="modal-header">
                    <h2>신규 고객사 등록</h2>
                    {/* 닫기 버튼을 누르면 부모가 물려준 closeModal 함수 실행 */}
                    <button onClick={closeModal} className="close-btn"> × </button>
                </div>
                
                {/* 스크롤이 가능하도록 modal-body를 한 번 더 추가 */}
                <div className="modal-body-scrollable">
                    <div className="modal-body">
                        {/* --- 회사 정보 --- */}
                        <div className="form-section">
                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label>사업자 유형<span>*</span></label>
                                    <div className="type-button-group">
                                        <button type="button" className={`type-btn ${company.compType === 'P' ? 'active' : ''}`} onClick={() => handleCompanyChange({ target: { name: 'compType', value: 'P' } })}>
                                            법인사업자
                                        </button>
                                        <button type="button" className={`type-btn ${company.compType === 'I' ? 'active' : ''}`} onClick={() => handleCompanyChange({ target: { name: 'compType', value: 'I' } })}>
                                            개인사업자
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>상호명(이름)<span>*</span></label>
                                    <input type="text" name="compName" value={company.compName} onChange={handleCompanyChange} />
                                </div>
                                <div className="form-group">
                                    <label>대표자명<span>*</span></label>
                                    <input type="text" name="ownerName" value={company.ownerName} onChange={handleCompanyChange} />
                                </div>
                                <div className="form-group">
                                    <label>대표 전화번호<span>*</span></label>
                                    <input type="text" name="compTel" value={company.compTel} onChange={handleCompanyChange} />
                                </div>
                                <div className="form-group">
                                    <label>사업자번호</label>
                                    <input type="text" name="compNo" value={company.compNo} onChange={handleCompanyChange} />
                                </div>
                                <div className="form-group full-width">
                                    <label>사업 소재지</label>
                                    <input type="text" name="compAddr" value={company.compAddr} onChange={handleCompanyChange} />
                                </div>
                            </div>
                        </div>

                        <hr />

                        {/* --- 담당자 정보 --- */}
                        <div className="form-section">
                            <div className="form-header">
                                <h4>담당자 정보</h4>
                                <div className="add-member-wrapper">
                                    <button type="button" onClick={addMemberRow} className="add-member-text-btn">
                                        + 담당자 추가
                                    </button>
                                </div>
                            </div>
                            {members.map((member, index) => (
                                <div key={index} className="dynamic-row">
                                    <div className="dynamic-row-inputs">
                                        <div className="input-large">
                                            <input type="text" name="contactName" placeholder="이름" value={member.contactName} onChange={(e) => handleMemberChange(index, e)} />
                                        </div>
                                        <div className="input-small">
                                            <input type="text" name="contactDept" placeholder="부서" value={member.contactDept} onChange={(e) => handleMemberChange(index, e)} />
                                        </div>
                                        <div className="input-small">
                                            <input type="text" name="contactPosition" placeholder="직책" value={member.contactPosition} onChange={(e) => handleMemberChange(index, e)} />
                                        </div>
                                        <div className="input-large">
                                            <input type="text" name="contactPhone" placeholder="연락처" value={member.contactPhone} onChange={(e) => handleMemberChange(index, e)} />
                                        </div>
                                        <div className="input-large">
                                            <input type="email" name="contactEmail" placeholder="이메일" value={member.contactEmail} onChange={(e) => handleMemberChange(index, e)} />
                                        </div>
                                    </div>
                                    <button onClick={() => removeMemberRow(index)} className="remove-btn">삭제</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button onClick={closeModal} className="btn-secondary">취소</button>
                    <button onClick={handleSubmit} className="btn-primary">등록</button>
                </div>
            </div>
        </div>
    );

}