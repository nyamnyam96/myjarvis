import { toast } from 'react-toastify';
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import createInstance from "../../axios/interceptor";

import ContractContent from './detail/ContractContent';
import ContractFiles from './detail/ContractFiles';
import ContractHistory from './detail/ContractHistory';
import ContractMemos from './detail/ContractMemos';
import SignatureModal from "./detail/SignatureModal";

import "./ContractDetail.css"; // 상세 페이지용 CSS 파일
import StatusChangeModal from './StatusChangeModal';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


export default function ContractDetail() {
    const navigate = useNavigate();
    const { contractNo } = useParams(); // URL의 파라미터(계약번호) 가져오기
    const { loginMember } = useUserStore(); // 로그인 정보 (API 요청 시 사용)
    const serverUrl = import.meta.env.VITE_BACK_SERVER;
    const axiosInstance = createInstance();    
    const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('content'); //현재 활성화된 탭을 관리할 state    
    const [signatureModal, setSignatureModal] = useState({
        isOpen: false,
        party: null, // 어떤 당사자가 서명하는지
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pdfExportComponent = useRef(null);


    const handlePdfExport = async () => {
        const input = pdfExportComponent.current;
        if (activeTab !== 'content' || !input) {
            alert("PDF로 출력하려면 '계약 내용' 탭을 먼저 선택해주세요.");
            return;
        }

        try {
            // 1. html2canvas로 전체 내용을 하나의 긴 이미지(canvas)로 캡처
            const canvas = await html2canvas(input, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');

            // 2. PDF 문서(A4)의 너비와 높이 설정
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // 3. 캡처한 이미지의 너비를 PDF 너비에 맞추고, 그 비율에 따라 이미지 높이 계산
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = pdfWidth / imgWidth;
            //const canvasImgHeight = imgHeight * ratio;
            
            const marginX = 10; // 좌우 여백 (mm)
            const contentWidth = pdfWidth - marginX * 2; // 이미지 너비를 여백을 뺀 크기로 조정
            const canvasImgHeight = imgHeight * (contentWidth / imgWidth); // 비율에 따라 높이 재계산 

            // 4. 이미지를 페이지 높이에 맞춰 여러 페이지로 분할하여 추가
            let heightLeft = canvasImgHeight;
            let position = 0;

            // 첫 페이지 추가
            pdf.addImage(imgData, 'PNG', marginX, position, contentWidth, canvasImgHeight);
            heightLeft -= pdfHeight;

            // 내용이 한 페이지를 넘으면, 새 페이지를 추가하고 남은 이미지를 잘라 붙여넣기
            while (heightLeft > 0) {
                position = heightLeft - canvasImgHeight; // 다음 이미지 조각의 y 위치
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', marginX, position, contentWidth, canvasImgHeight);
                heightLeft -= pdfHeight;
            }

            // 5. PDF 파일 저장
            pdf.save(`${contract.contractInfo.contractTitle}.pdf`);

        } catch (error) {
            console.error("PDF 생성 오류:", error);
            alert("PDF를 생성하는 중 오류가 발생했습니다.");
        }
    };

    function reloadContractData() {
        axiosInstance.get(`${serverUrl}/contract/${contractNo}`)
            .then(res => {
                setContract(res.data);
            })
            .catch(err => {
                console.error("데이터 새로고침 에러:", err);
                toast.error("데이터를 새로고침하는 데 실패했습니다.");
            });
    };
    
    useEffect(() => {        
        axiosInstance.get(`${serverUrl}/contract/${contractNo}`)        
            .then(res => {
                // 성공적으로 데이터를 받아오면 contract state를 업데이트합니다.
                setContract(res.data);
            })
            .catch(err => {
                console.error("API 호출 에러:", err);
            })
            .finally(() => {
                // API 호출 성공/실패 여부와 상관없이 로딩 상태를 해제합니다.
                setLoading(false);
            });
    }, [contractNo]); // contractNo가 바뀔 때마다 API를 다시 호출합니다.


    // 👇 2. 서명 모달을 여는 함수
    const handleOpenSignatureModal = (partyToSign) => {
        setSignatureModal({ isOpen: true, party: partyToSign });
    };
    // 👇 3. 서명 모달을 닫는 함수
    const handleCloseSignatureModal = () => {
        setSignatureModal({ isOpen: false, party: null });
    };

    // 👇 4. 서명 완료 시 데이터를 받아 처리하는 함수
    const handleConfirmSignature = (signatureData) => {
        // contract 상태를 업데이트해서 화면을 리렌더링
        setContract(prevContract => {
            // 기존 계약 데이터 복사
            const newContract = { ...prevContract };
            
            // 서명한 당사자를 찾아서 정보 업데이트
            const partyIndex = newContract.parties.findIndex(
                p => p.name === signatureModal.party.name
            );

            if (partyIndex !== -1) {            
                newContract.parties[partyIndex] = {
                    ...newContract.parties[partyIndex],
                    signed: true,
                    signedDate: new Date().toISOString().slice(0, 10),
                    signatureImage: signatureData
                };
            }
            return newContract;
        });

        const signatureDto = {
        memberNo: signatureModal.party.memberNo, // 서명한 사람의 memberNo
        signatureImage: signatureData
        };

        axiosInstance.post(`${serverUrl}/contract/${contractNo}/signature`, signatureDto)
        .then(res => {
            // 성공적으로 DB에 저장되면 사용자에게 알림
            toast.success("서명이 저장되었습니다."); // react-toastify 사용 예시
        })
        .catch(err => {
            console.error("서명 저장 실패:", err);
            toast.error("서명 저장 중 오류가 발생했습니다.");
        });

        // 모달 닫기
        handleCloseSignatureModal();
    };
        
    // 상태 코드에 따라 클래스와 텍스트를 반환하는 함수 (재사용)
    const getStatusInfo = (statusCode) => {
        switch(statusCode) {
            case 'T': return { className: 'status-draft', text: '초안' };
            case 'W': return { className: 'status-progress', text: '진행' };
            case 'C': return { className: 'status-completed', text: '완료' };
            case 'X': return { className: 'status-canceled', text: '취소' };
            default: return { className: '', text: '알 수 없음' };
        }
    };
    
    if (loading) {
        return <div className="loading-spinner">로딩 중...</div>;
    }
    
    if (!contract) {
        return <div className="error-message">계약 정보를 불러올 수 없습니다.</div>;
    }
    
    const contractStatus = getStatusInfo(contract.contractInfo.statusCode);
    
    return (
        
        <div className="content-wrap contract-detail-wrap">
            {/* ... 헤더 ... */}
            {signatureModal.isOpen && (
                <SignatureModal 
                    partyName={signatureModal.party.name}
                    onConfirm={handleConfirmSignature}
                    closeModal={handleCloseSignatureModal} 
                />
            )}

            {/* StatusChangeModal을 조건부로 렌더링하고, 필요한 props를 전달 */}
            {isModalOpen && (
                <StatusChangeModal
                    contract={contract.contractInfo} // contract.contractInfo를 전달
                    closeModal={() => setIsModalOpen(false)}
                    reloadList={reloadContractData} // reloadList prop에 새로 만든 함수 연결
                />
            )}

            {/* 최상단 버튼 영역 */}
            <div className="content-header">
                <button type="button" className="btn-back" onClick={() => navigate('/main/contract/list')}>
                    <span className="material-symbols-outlined">arrow_back</span>
                    이전 목록
                </button>
                <div className="header-actions">
                    <button type="button" className="btn-secondary" onClick={handlePdfExport}>
                        PDF 출력
                    </button>
                    <button type="button" className="btn-primary">전자 계약 요청</button>
                </div>
            </div>

            {/* 컨텐츠 영역 */}
            <div className="detail-layout">
                {/* 1. 연결된 고객사 정보 */}
                <div className="form-card full-width-card">
                    <div className="company-header">
                        <h3 className="company-name">{contract.companyInfo.compName}</h3>
                        <span className={`status-badge ${contractStatus.className}`}>{contractStatus.text}</span>
                    </div>
                    <div className="company-details">
                        <span>대표자: {contract.companyInfo.ownerName}</span>
                        <span>사업자번호: {contract.companyInfo.compNo}</span>
                    </div>
                </div>

                {/* 2. 계약 기본 정보 & 전자계약 현황 (2단 그리드) */}
                <div className="grid-col-2">
                    <div className="form-card">
                        <h3 className="card-title">계약 기본 정보</h3>
                        <div className="info-grid">
                            <span>계약명</span><p>{contract.contractInfo.contractTitle}</p>
                            <span>계약기간</span><p>{contract.contractInfo.contractStart} ~ {contract.contractInfo.contractEnd}</p>
                            <span>계약금액</span><p>{contract.contractInfo.contractDeposit.toLocaleString()} 원</p>
                        </div>
                        <button className="btn-secondary full-width mt-20" onClick={() => setIsModalOpen(true)}>
                        상태 변경
                        </button>
                    </div>

                    <div className="form-card">
                        <h3 className="card-title">전자계약 현황</h3>                        
                        <ul className="party-list">
                            {contract.parties.map((party, index) => (
                                <li key={index} className={party.signed ? 'signed' : ''}>
                                    <span className="party-role">{party.role}</span>
                                    <span className="party-name">{party.name}</span>
                                    <span className="signature-status">{party.signed ? '서명 완료' : '서명 대기'}</span>
                                </li>
                            ))}
                        </ul>
                         <button className="btn-secondary full-width mt-20">발송 이력 보기</button>
                    </div>
                </div>

                {/* 3. 계약 내용, 첨부파일 등 탭 영역 */}
                <div className="form-card full-width-card">
                   {/* 탭 네비게이션 */}
                    <div className="tab-nav">
                        <button 
                            className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
                            onClick={() => setActiveTab('content')}>
                            계약 내용
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'files' ? 'active' : ''}`}
                            onClick={() => setActiveTab('files')}>
                            첨부 파일
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                            onClick={() => setActiveTab('history')}>
                            변경 이력
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'memos' ? 'active' : ''}`}
                            onClick={() => setActiveTab('memos')}>
                            메모/회의
                        </button>
                    </div>

                    {/* 탭 컨텐츠 */}
                    <div className="tab-content">
                        {activeTab === 'content' && <ContractContent ref={pdfExportComponent} content={contract.contractInfo.contractContent} parties={contract.parties} onOpenSignatureModal={handleOpenSignatureModal}/>}
                        {activeTab === 'files' && <ContractFiles files={contract.attachedFiles} />}
                        {activeTab === 'history' && <ContractHistory history={contract.changeHistory} />}
                        {activeTab === 'memos' && <ContractMemos memos={contract.memos} />}
                    </div>
                </div>
            </div>
        </div>
    );
}