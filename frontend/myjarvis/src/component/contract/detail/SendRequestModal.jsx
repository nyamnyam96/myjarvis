import { useEffect, useState } from "react";
import useUserStore from "../../../store/useUserStore";
import createInstance from "../../../axios/interceptor";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "./SendRequestModal.css";

export default function SendRequestModal({ contract, closeModal }) {
    const serverUrl = import.meta.env.VITE_BACK_SERVER;
    const { loginMember } = useUserStore();
    const axiosInstance = createInstance();

    const [companyMembers, setCompanyMembers] = useState([]); // 담당자 목록
    const [selectedMember, setSelectedMember] = useState(null); // 선택된 담당자
    const [newMember, setNewMember] = useState({ contactName: '', contactEmail: '' }); // 새로 추가할 담당자 정보
    const [isLoading, setIsLoading] = useState(true);

    // 모달이 처음 열릴 때, 해당 고객사의 담당자 목록을 불러옵니다.
    useEffect(() => {
        const companyCd = contract.companyInfo.compCd;
        axiosInstance.get(`${serverUrl}/company/${companyCd}/members`)
            .then(res => {
                setCompanyMembers(res.data);
                // 담당자가 있으면 첫 번째 사람을 기본으로 선택
                if (res.data.length > 0) {
                    setSelectedMember(res.data[0]);
                }
            })
            .catch(err => console.error("담당자 목록 조회 실패:", err))
            .finally(() => setIsLoading(false));
    }, [contract.companyInfo.compCd]);

    const handleNewMemberChange = (e) => {
        setNewMember({ ...newMember, [e.target.name]: e.target.value });
    };

    // 최종 발송 처리 함수
    const handleSendRequest = async () => {
        let targetRecipient = selectedMember;

        // 만약 새로 입력한 담당자가 있다면 (기존 담당자가 없는 경우)
        if (companyMembers.length === 0 && newMember.contactName && newMember.contactEmail) {
            try {
                // 1. 담당자 추가 API 호출
                const newMemberPayload = { 
                    ...newMember, 
                    compCd: contract.companyInfo.compCd, 
                    memberNo: loginMember.memberNo 
                };
                const response = await axiosInstance.post(`${serverUrl}/company/members`, newMemberPayload);

                // 성공 시, 새로 추가된 담당자 정보를 수신자로 설정
                targetRecipient = { ...newMemberPayload, contactIdx: response.data.contactIdx }; // 백엔드에서 새로 생성된 ID를 반환한다고 가정
                toast.success("신규 담당자가 추가되었습니다.");
            } catch (error) {
                toast.error("담당자 추가에 실패했습니다.");
                console.error(error);
                return; // 담당자 추가 실패 시 중단
            }
        }

        if (!targetRecipient) {
            toast.warn("수신자를 선택하거나 추가해주세요.");
            return;
        }

        // 2. 최종 이메일 발송 API 호출
        axiosInstance.post(`${serverUrl}/contract/${contract.contractInfo.contractNo}/send-request`, {
            recipientEmail: targetRecipient.contactEmail,
            recipientName: targetRecipient.contactName,
            recipientMemberNo: targetRecipient.contactIdx 
            // 백엔드는 이 정보를 받아 토큰 생성 및 이메일 발송 처리
        })
        .then(res => {
            Swal.fire("발송 완료", "서명 요청 이메일이 성공적으로 발송되었습니다.", "success");
            closeModal();
        })
        .catch(err => {
            Swal.fire("발송 실패", "이메일 발송 중 오류가 발생했습니다.", "error");
            console.error(err);
        });
    };

    return (
        <div className="modal-overlay">
            <div className="send-request-modal-content">
                <div className="modal-header">
                    <h4>서명 요청 발송</h4>
                    <button onClick={closeModal} className="close-btn">&times;</button>
                </div>

                <div className="modal-body">
                    {/* 수신자 정보 */}
                    <div className="form-section">
                        <h5>수신자 정보</h5>
                        {isLoading ? <p>담당자 목록을 불러오는 중...</p> : 
                            companyMembers.length > 0 ? (
                                <select 
                                    value={selectedMember?.contactIdx} 
                                    onChange={(e) => setSelectedMember(companyMembers.find(m => m.contactIdx === e.target.value))}
                                >
                                    {companyMembers.map(member => (
                                        <option key={member.contactIdx} value={member.contactIdx}>
                                            {member.contactName} ({member.contactEmail})
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <div className="new-member-form">
                                    <p>등록된 담당자가 없습니다. 새로 추가해주세요.</p>
                                    <input type="text" name="contactName" placeholder="담당자 이름" value={newMember.contactName} onChange={handleNewMemberChange} />
                                    <input type="email" name="contactEmail" placeholder="이메일 주소" value={newMember.contactEmail} onChange={handleNewMemberChange} />
                                </div>
                            )
                        }
                    </div>

                    {/* 내용 */}
                    <div className="form-section">
                        <h5>발송 내용 미리보기</h5>
                        <div className="email-preview">
                            <p><strong>제목:</strong> [마이자비스] {contract.contractInfo.contractTitle} 계약서 서명을 요청합니다.</p>
                            <p>안녕하세요. {selectedMember?.contactName || newMember.contactName || '담당자'}님,</p>
                            <p>계약 내용을 확인하시고 서명을 진행해주세요.</p>
                            <p><strong>[서명 링크가 여기에 포함됩니다]</strong></p>
                            <div className="pdf-attachment-preview">
                                <span className="material-symbols-outlined">description</span>
                                <span>{contract.contractInfo.contractTitle}.pdf (첨부)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button onClick={closeModal} className="btn-secondary">취소</button>
                    <button onClick={handleSendRequest} className="btn-primary">발송</button>
                </div>
            </div>
        </div>
    );
}