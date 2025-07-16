// src/component/contract/detail/SignatureModal.jsx

import { useRef, useState } from "react";
import SignatureCanvas from 'react-signature-canvas';
import './SignatureModal.css';

export default function SignatureModal({ partyName, onConfirm, closeModal }) {
    const sigCanvas = useRef(null);
    const [activeTab, setActiveTab] = useState('draw'); // 'draw' 또는 'type'
    const [typedName, setTypedName] = useState(partyName);

    // 서명 패드 지우기
    const clear = () => {
        sigCanvas.current.clear();
    }

    // 서명 저장하기
    const saveSignature = () => {
        let signatureImage = null;

        if (activeTab === 'draw' && !sigCanvas.current.isEmpty()) {
            // 그리기 탭: 캔버스 내용을 이미지(data URL)로 변환
            signatureImage = sigCanvas.current.toDataURL('image/png');
        } else if (activeTab === 'type') {
            // 입력하기 탭: 텍스트를 이미지로 변환하는 로직 (다음 단계에서 구현)
            // 우선은 텍스트 자체를 전달합니다.
            signatureImage = typedName; // 임시로 텍스트 전달
            console.log("입력된 서명:", typedName);
        }

        if (signatureImage) {
            onConfirm(signatureImage); // 부모 컴포넌트로 서명 정보 전달
        } else {
            alert("서명을 그리거나 입력해주세요.");
        }
    }

    return (
        <div className="modal-overlay">
            <div className="signature-modal-content">
                <div className="modal-header">
                    <h4>서명하기</h4>
                    <button onClick={closeModal} className="close-btn">&times;</button>
                </div>
                
                <div className="signature-tabs">
                    <button className={activeTab === 'draw' ? 'active' : ''} onClick={() => setActiveTab('draw')}>그리기</button>
                    <button className={activeTab === 'type' ? 'active' : ''} onClick={() => setActiveTab('type')}>입력하기</button>
                </div>

                <div className="signature-body">
                    {activeTab === 'draw' ? (
                        <SignatureCanvas 
                            ref={sigCanvas}
                            penColor='black'
                            canvasProps={{ className: 'sig-canvas' }} 
                        />
                    ) : (
                        <div className="type-signature-area">
                            <input 
                                type="text" 
                                value={typedName} 
                                onChange={(e) => setTypedName(e.target.value)}
                                className="type-input"
                            />
                            <div className="typed-signature-preview">
                                {typedName}
                            </div>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    {activeTab === 'draw' && <button onClick={clear} className="btn-secondary">지우기</button>}
                    <button onClick={saveSignature} className="btn-primary">확인</button>
                </div>
            </div>
        </div>
    );
}