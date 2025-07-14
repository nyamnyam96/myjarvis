import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import createInstance from '../../axios/interceptor';
import useUserStore from '../../store/useUserStore';
import Swal from 'sweetalert2';
import './ContractInsert.css';
import CompanySearchModal from './CompanySearchModal';


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

    // 입력 필드 변경 시 state를 업데이트하는 함수
    function handleContractChange(e) {
        const { name, value } = e.target;

        if (name === 'contractDeposit') {
            const numericValue = parseInt(value.replace(/,/g, ''), 10) || 0;
            setContract(prev => ({ ...prev, [name]: numericValue }));
        } else {
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
        if (!selectedCompany || !contract.contractTitle) {
            Swal.fire('입력 오류', '계약명과 고객사는 필수입니다.', 'warning');
            return;
        }

        // 1. FormData 객체 생성
        const formData = new FormData();
        // 2. 계약 정보(JSON)를 'contract' 라는 이름의 파트로 추가
        const contractData = {
            ...contract,
            memberNo: loginMember.memberNo,
            partyList: [{
                compCd: selectedCompany.compCd,
                memberNo: loginMember.memberNo,
                role: '당사자'
            }]
        };
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

        // 실제로는 여기서 AI 서버 API를 호출합니다.
        setTimeout(() => {
            // 아래는 456.html을 참고한 가짜 결과 데이터
            setAiResult({
                summary: "본 계약은 '갑'의 웹사이트 유지보수 및 운영에 관한 내용을 다루며, 계약 기간은 1년, 월 50만원의 비용이 발생합니다...",
                pros: ["안정적인 월별 수익 보장", "계약 자동 연장 조항으로 장기 고객 확보 가능"],
                cons: ["무상 유지보수 범위가 불명확하여 추가 작업 요구 가능성", "계약 해지 조건이 상대방에게 유리하게 설정됨"]
            });
            setIsAnalyzing(false);
        }, 2000);
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
                </div>

                {/* 계약 상세 내용 */}
                <div className="form-card">
                    <div className="card-header-flex">
                        <h3 className="card-title">계약 상세 내용</h3>

                        <button
                            type="button"
                            className="btn-ai-review"
                            onClick={handleAiReview}
                            disabled={isAnalyzing}
                        >
                            {isAnalyzing ? '🤖 검토 중...' : '✨ AI로 계약서 검토하기'}
                        </button>
                        
                    </div>                    
                    
                    <textarea
                    name="contractContent"
                    className="form-textarea"
                    value={contract.contractContent}
                    onChange={handleContractChange}
                    placeholder="계약 상세 내용을 입력하세요."
                    />

                </div>

                {/* 👇 4. AI 검토 결과 카드 (결과가 있을 때만 보임) */}
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
                    <h3 className="card-title">첨부 파일</h3>
                    <div className="file-attachment-box">
                        <div className="file-list">
                            {attachedFiles.map((file, index) => (
                                <div key={index} className="file-item">
                                    <span>{file.name}</span>
                                    <button type="button" onClick={() => removeFile(index)}>×</button>
                                </div>
                            ))}
                        </div>
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