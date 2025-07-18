import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import createInstance from '../../axios/interceptor';
import useUserStore from '../../store/useUserStore';
import Swal from 'sweetalert2';
import './ContractInsert.css';
import CompanySearchModal from './CompanySearchModal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill 에디터의 'snow' 테마 CSS


export default function ContractInsert() {
    const serverUrl = import.meta.env.VITE_BACK_SERVER; // 서버 주소
    const navigate = useNavigate();
    const axiosInstance = createInstance();
    const { loginMember } = useUserStore();  

    const [contract, setContract] = useState({ //계약 기본 정보 관리 state
        contractTitle: '',
        contractContent: '',
        contractStart: '',
        contractEnd: '',
        contractDeposit: 0,
    });

    const [attachedFiles, setAttachedFiles] = useState([]);     
    const [selectedCompany, setSelectedCompany] = useState(null); // 선택된 고객사를 관리할 state
    const [isModalOpen, setIsModalOpen] = useState(false) //모달 열고 닫고       
    const [aiResult, setAiResult] = useState(null); //계약 내용(에디터)과 AI 분석 결과를 위한 state 추가 
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // 👇 1. 새로운 state들을 추가합니다.
    const [companyMembers, setCompanyMembers] = useState([]); // 선택된 회사의 담당자 목록
    const [selectedMember, setSelectedMember] = useState(null); // 최종 선택된 담당자
    const [isLoadingMembers, setIsLoadingMembers] = useState(false); // 담당자 로딩 상태

    // 👇 2. 고객사가 선택될 때마다, 해당 회사의 담당자 목록을 불러오는 useEffect 추가
    useEffect(() => {
        if (selectedCompany) {
            setIsLoadingMembers(true);
            axiosInstance.get(`${serverUrl}/company/${selectedCompany.compCd}/members`)
                .then(res => {
                    setCompanyMembers(res.data);
                    // 담당자가 있으면 첫 번째 사람을 기본으로 선택
                    if (res.data.length > 0) {
                        setSelectedMember(res.data[0]);
                    } else {
                        setSelectedMember(null);
                    }
                })
                .catch(err => console.error(err))
                .finally(() => setIsLoadingMembers(false));
        }
    }, [selectedCompany]);
    

    // 입력 필드 변경 시 state를 업데이트하는 함수
    function handleContractChange(e) {
        const { name, value } = e.target;

        if (name === 'contractDeposit') {
            // 1. 입력된 값에서 쉼표(,)를 모두 제거
            const numericValue = value.replace(/,/g, '');
            // 2. 숫자가 아니거나 비어있으면 0으로, 정상이면 숫자로 변환하여 저장
            setContract(prev => ({ ...prev, [name]: parseInt(numericValue, 10) || 0 }));
        } else {
            // 다른 필드는 기존과 동일하게 처리
            setContract(prev => ({ ...prev, [name]: value }));
        }
    };

    //고객사를 선택했을 때 실행될 함수
    function handleSelectCompany(company) {
        setSelectedCompany(company);
        setIsModalOpen(false); // 모달 닫기
    };

    //파일이 선택되었을 때, attachedFiles 상태에 추가하는 함수
    function handleFileChange(e) {
        // e.target.files는 FileList 객체이므로, Array.from()으로 실제 배열로 변환
        const newFiles = Array.from(e.target.files);
        setAttachedFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    //선택된 파일을 목록에서 제거하는 함수
    function removeFile(fileIndex) {
        setAttachedFiles(prevFiles => prevFiles.filter((file, index) => index !== fileIndex));
    };
    
    // 최종 등록 함수
    function handleSubmit() {
        if (!selectedCompany || !selectedMember) {
            Swal.fire('입력 오류', '고객사와 계약 담당자는 필수입니다.', 'warning');
            return;
        }        

        const contractData = {
            ...contract,
            memberNo: loginMember.memberNo,
            partyList: [
            { 
                compCd: selectedCompany.compCd, 
                contactIdx: selectedMember.contactIdx, 
                role: '고객사' 
            }
        ]
        };

        const formData = new FormData();

        // 2. 계약 정보(JSON)를 'contract' 라는 이름의 파트로 추가
        formData.append("contract", new Blob([JSON.stringify(contractData)], { type: "application/json" }));

        // 3. 첨부파일들을 'files' 라는 이름의 파트로 추가
        attachedFiles.forEach(file => {
            formData.append("files", file);
        });

        // 4. FormData를 서버로 전송
        axiosInstance.post(serverUrl + '/contract', formData, {
            headers: { 'Content-Type': 'multipart/form-data' } // 헤더 타입 변경
        })
        .then(res => {
            if (res.data > 0) {
                Swal.fire('등록 성공', '신규 계약이 등록되었습니다.', 'success');
                navigate('/main/contract/list');
            }
        })
        .catch(err => console.error(err));
    };
    

    //AI 검토 시뮬레이션 함수
    function handleAiReview() {       
        if (!contract.contractContent) {
            Swal.fire('확인 필요', 'AI 검토를 위해 계약 상세 내용을 먼저 입력해주세요.', 'info');
            return;
        }
        
        setIsAnalyzing(true);
        setAiResult(null); // 이전 결과 초기화

        const requestData = {
        content: contract.contractContent
        };

        // 👇 [핵심] 실제 백엔드의 AI 검토 API를 호출합니다.
        axiosInstance.post(serverUrl + '/contract/ai-review', requestData)
        .then(res => {
            // 성공 시, 백엔드에서 받은 분석 결과를 aiResult 상태에 저장
            setAiResult(res.data);
        })
        .catch(err => {
            console.error("AI 검토 오류:", err);
            Swal.fire('오류', 'AI 검토 중 문제가 발생했습니다.', 'error');
        })
        .finally(() => {
            // 성공/실패 여부와 상관없이 '분석 중...' 상태를 해제
            setIsAnalyzing(false);
        });
    };

    //Quill Editor의 내용이 변경될 때 호출될 함수
    function handleEditorChange(content) {
        // content 인자로 에디터의 HTML 내용이 바로 들어옵니다.
        setContract(prev => ({ ...prev, contractContent: content }));
    };


    return (
        <div className="content-wrap">
            <div className="content-header">
                <h2 className="content-title">신규 계약 등록</h2>
                <div className="header-actions">
                    <button type="button" className="btn-contract-cancel" onClick={() => navigate(-1)}>취소</button>
                    <button type="button" className="btn-contract-insert" onClick={handleSubmit}>등록하기</button>                   
                </div>
            </div>

            {/* 메인 컨텐츠 영역 */}
            <div className="contract-form-layout">                
                {/* 기본 정보 */}
                <div className="form-card">
                    <h3 className="card-title">기본 정보</h3>
                    <div className="form-group">
                        <label>계약명 <span>*</span></label>
                        <input type="text" name="contractTitle" value={contract.contractTitle} onChange={handleContractChange} />
                    </div>
                    <div className="form-grid-col-3">
                        <div className="form-group">
                            <label>계약 시작일</label>
                            <input type="date" name="contractStart" value={contract.contractStart} onChange={handleContractChange} />
                        </div>
                        <div className="form-group">
                            <label>계약 종료일</label>
                            <input type="date" name="contractEnd" value={contract.contractEnd} onChange={handleContractChange} />
                        </div>
                        <div className="form-group">
                            <label>계약 금액 (선택)</label>
                            <input type="text" name="contractDeposit" value={contract.contractDeposit.toLocaleString()} onChange={handleContractChange} placeholder="숫자만 입력" />
                        </div>                    
                    </div>
                </div>

                {/* 계약 고객사 정보 */}
                <div className="form-card">
                    <h3 className="card-title">계약 고객사 정보</h3>
                    {selectedCompany ? (
                        // 선택된 고객사가 있으면 정보 표시
                        <div className="company-info-box">
                            <p className="company-name">{selectedCompany.compName}</p>
                            <p className="owner-name">{selectedCompany.ownerName}</p>
                            <p className="comp-no">{selectedCompany.compNo}</p>
                        </div>
                    ) : (
                        <p className="party-info-placeholder">고객사를 검색하여 추가해주세요.</p>
                    )}
                    {/* 버튼 클릭 시 모달 열기 */}
                    <button type="button" className="btn-secondary full-width" onClick={() => setIsModalOpen(true)}>
                        {selectedCompany ? '고객사 변경' : '고객사 검색'}
                    </button>
                    
                    {/* 👇 담당자 선택 UI 추가 */}
                    {selectedCompany && (
                        <div className="form-group" style={{marginTop: '16px'}}>
                            <label>계약 담당자 <span>*</span></label>
                            {isLoadingMembers ? <p>담당자를 불러오는 중...</p> :
                                companyMembers.length > 0 ? (
                                    <select 
                                        value={selectedMember?.contactIdx} // 선택된 담당자 값 설정
                                        onChange={(e) => setSelectedMember(companyMembers.find(m => m.contactIdx === e.target.value))}
                                    >
                                        {companyMembers.map(member => (
                                            <option key={member.contactIdx} value={member.contactIdx}>
                                                {member.contactName} ({member.contactEmail || '이메일 없음'})
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p>등록된 담당자가 없습니다. 담당자를 먼저 추가해주세요.</p>
                                )
                            }
                        </div>
                    )}
                </div>

                {/* 계약 상세 내용 */}
                <div className="form-card">
                    <div className="card-header-flex">
                        <h3 className="card-title">계약 상세 내용</h3>
                        <button type="button" className="btn-ai-review" onClick={handleAiReview} disabled={isAnalyzing}>
                            {isAnalyzing ? '🤖 검토 중...' : '✨ AI로 계약서 검토하기'}
                        </button>                        
                    </div>                    
                    
                    <ReactQuill 
                        theme="snow" // 'snow' 또는 'bubble' 테마 선택
                        style={{ height: '400px', marginBottom: '40px', marginTop: '20px' }} // 높이 지정
                        value={contract.contractContent} // state와 연결
                        onChange={handleEditorChange} // 핸들러 연결
                    />

                </div>

                {/* AI 검토 결과 카드 (결과가 있을 때만 보임) */}
                {aiResult && (
                    <div className="form-card">
                        <h3 className="card-title">AI 검토 결과</h3>
                        <div className="ai-result-section">
                            <h4>✅ 핵심 요약</h4>
                            <p>{aiResult.summary}</p>
                        </div>
                        <div className="ai-result-section">
                            <h4>👍 유리한 조항</h4>
                            <ul>{aiResult.pros.map((item, i) => <li key={i}>{item}</li>)}</ul>
                        </div>
                        <div className="ai-result-section">
                            <h4>🚨 불리한/독소 조항</h4>
                            <ul>{aiResult.cons.map((item, i) => <li key={i}>{item}</li>)}</ul>
                        </div>
                    </div>
                )}

                {/* 👇 4. 파일 첨부 카드 */}
                <div className="form-card">                    
                    <div className="card-header-flex">
                        <h3 className="card-title">첨부 파일</h3>
                        {/* 2. '파일 추가' 버튼(label)과 input을 이곳으로 이동시킵니다. */}
                        <div>
                            <label className="file-upload-btn" htmlFor="contract-file-input">파일 추가</label>
                            <input 
                                type="file" 
                                id="contract-file-input" 
                                multiple 
                                onChange={handleFileChange} 
                                style={{ display: 'none' }} 
                            />
                        </div>
                    </div>

                    {/* 3. 파일 목록이 표시될 영역입니다. 이제 버튼이 없어서 깔끔해집니다. */}
                    <div className="file-attachment-box">
                        {attachedFiles.length > 0 ? (
                            <div className="file-list">
                                {attachedFiles.map((file, index) => (
                                    <div key={index} className="file-item">
                                        <span>{file.name}</span>
                                        <button type="button" onClick={() => removeFile(index)}>×</button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // 파일이 없을 때 안내 문구 표시
                            <div className="no-files-placeholder">                                
                                <p>첨부할 파일을 '파일 추가' 버튼으로 등록해주세요.</p>
                            </div>
                        )}
                    </div>
                </div>              
                

                {/* 고객사 검색 모달 */}
                {isModalOpen && 
                    <CompanySearchModal 
                        onSelect={handleSelectCompany} 
                        closeModal={() => setIsModalOpen(false)} 
                    />
                }                
            </div>
        </div>
    );
}