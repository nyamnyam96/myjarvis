import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; //토큰이 필요 없으므로 기본 axios 사용
import SignatureModal from "../component/contract/detail/SignatureModal";
import ContractContent from "../component/contract/detail/ContractContent"; // 재사용
import { toast } from "react-toastify";
import "./PublicSignPage.css";

export default function PublicSignPage() {
    const { token } = useParams(); // URL에서 고유 토큰 값 가져오기
    const serverUrl = import.meta.env.VITE_BACK_SERVER;

    const [contractData, setContractData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);    
    const [isSignatureModalOpen, setSignatureModalOpen] = useState(false); // 서명 모달 상태

    // 페이지가 로드될 때, 토큰을 이용해 계약 정보를 불러옵니다.
    useEffect(() => {
        if (token) {
            axios.get(`${serverUrl}/public/contract/${token}`)
                .then(res => {
                    setContractData(res.data);
                })
                .catch(err => {
                    console.error("계약 정보 조회 실패:", err);
                    setError("유효하지 않거나 만료된 서명 요청입니다.");
                })
                .finally(() => setLoading(false));
        }
    }, [token]);

    // 서명 완료 시 실행될 함수
    const handleConfirmSignature = (signatureData) => {
        // [핵심] 서명 데이터를 백엔드로 전송
        axios.post(`${serverUrl}/public/sign/${token}`, { signatureImage: signatureData })
            .then(res => {
                toast.success("서명이 성공적으로 완료되었습니다. 감사합니다.");
                setSignatureModalOpen(false);
                // 서명 완료 후, 최신 정보를 반영하기 위해 페이지를 새로고침
                window.location.reload(); 
            })
            .catch(err => {
                console.error("서명 저장 실패:", err);
                toast.error("서명을 저장하는 중 오류가 발생했습니다.");
                setSignatureModalOpen(false);
            });
    };

    if (loading) return <div>계약 정보를 불러오는 중...</div>;
    if (error) return <div>오류: {error}</div>;
    if (!contractData) return <div>해당하는 계약 정보가 없습니다.</div>;

    // 서명해야 할 본인(수신자)의 정보를 찾습니다.
    const partyToSign = contractData.parties.find(p => !p.signed);

    return (
        <div className="public-sign-page-container">
            {isSignatureModalOpen && (
                <SignatureModal 
                    partyName={partyToSign?.name}
                    onConfirm={handleConfirmSignature}
                    closeModal={() => setSignatureModalOpen(false)} 
                />
            )}

            <header className="public-header">
                <h1>서명 요청 문서</h1>
            </header>
            <main className="public-main-content">
                <div className="request-info-card">
                    <p><strong>{contractData.companyInfo.compName}</strong>에서</p>
                    <p><strong>'{contractData.contractInfo.contractTitle}'</strong> 계약에 대한 서명을 요청했습니다.</p>
                    <p className="request-date">요청일: {new Date().toLocaleDateString()}</p>
                </div>

                {/* 아직 서명할 사람이 남아있는 경우에만 버튼을 보여줌 */}
                {partyToSign && (
                <div className="action-bar">
                    {partyToSign && !partyToSign.signed && (
                         <button className="btn-primary" onClick={() => setSignatureModalOpen(true)}>
                            문서 확인 및 서명하기
                        </button>
                    )}
                </div>
                )}

                {/* 기존 ContractContent 컴포넌트 재사용 */}
                <div className="contract-document">
                     <ContractContent 
                        content={contractData.contractInfo.contractContent} 
                        parties={contractData.parties} 
                        isPublic={true}                       
                    />
                </div>
            </main>
        </div>
    );
}