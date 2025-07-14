import { useState } from 'react';
import createInstance from '../../axios/interceptor';
import useUserStore from '../../store/useUserStore';
import Swal from 'sweetalert2';
import './StatusChangeModal.css'; 

export default function StatusChangeModal({ contract, closeModal, reloadList }) {
    const serverUrl = import.meta.env.VITE_BACK_SERVER;
    const axiosInstance = createInstance();

    const [newStatusCode, setNewStatusCode] = useState('');
    const [historyContent, setHistoryContent] = useState('');

    const handleSubmit = () => {
        if (!newStatusCode) {
            Swal.fire('선택 오류', '변경할 상태를 선택해주세요.', 'warning');
            return;
        }
        
        // 1. Zustand 스토어에서 현재 로그인한 사용자 정보를 가져옴
        const { loginMember } = useUserStore.getState();

        // 2. 서버에 보낼 최종 데이터 조립 (memberNo 포함)
        const finalData = {
            statusCode: newStatusCode,
            contractHistoryContent: historyContent,
            memberNo: loginMember.memberNo // 로그인한 사용자의 memberNo 추가
        };

        // 3. axios로 서버에 전송
        axiosInstance.patch(`${serverUrl}/contract/${contract.contractNo}/status`, finalData)
            .then(res => {
                if (res.data > 0) {
                    Swal.fire('성공', '계약 상태가 변경되었습니다.', 'success');
                    closeModal(); // 모달 닫기
                    reloadList(); // 목록 새로고침
                } else {
                    Swal.fire('실패', '상태 변경 중 문제가 발생했습니다.', 'error');
                }
            })
            .catch(err => {
                console.error(err);
                Swal.fire('오류', '서버 통신 중 오류가 발생했습니다.', 'error');
            });
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>상태 변경</h2>
                    <button onClick={closeModal} className="close-btn"> × </button>
                </div>
                <div className="modal-body">
                    <p className="contract-title-label">계약명</p>
                    <p className="contract-title-text">{contract.contractTitle}</p>
                    
                    <div className="form-group">
                        <label>변경할 상태</label>
                        <select value={newStatusCode} onChange={(e) => setNewStatusCode(e.target.value)}>
                            <option value="">-- 상태 선택 --</option>
                            <option value="T">초안</option>
                            <option value="W">진행(대기)</option>
                            <option value="C">완료(확정)</option>
                            <option value="X">취소</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>변경 사유 (선택)</label>
                        <textarea 
                            value={historyContent}
                            onChange={(e) => setHistoryContent(e.target.value)}
                            placeholder="변경 사유를 입력하세요."
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={closeModal} className="btn-secondary">취소</button>
                    <button onClick={handleSubmit} className="btn-primary">변경</button>
                </div>
            </div>
        </div>
    );
}