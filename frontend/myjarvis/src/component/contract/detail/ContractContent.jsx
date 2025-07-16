// src/component/contract/detail/ContractContent.jsx
import { forwardRef } from 'react';
import './ContractContent.css';

// 컴포넌트를 forwardRef로 감싸고, 두 번째 인자로 ref를 받습니다.
const ContractContent = forwardRef(({ content, parties, onOpenSignatureModal }, ref) => {
    const createMarkup = () => ({ __html: content });

    return (
        // 3. 최상위 div에 부모로부터 받은 ref를 연결합니다.
        <div className="contract-content-wrap" ref={ref}>
            <div className="editor-content-view" dangerouslySetInnerHTML={createMarkup()} />            
            <div className="signature-section">
                <h3>서명</h3>
                <div className="signature-grid">
                    {parties.map((party, index) => (
                        <div key={index} className="signature-box">
                            <div className="party-info">
                                <span className="party-role">{party.role}</span>
                                <span className="party-name">{party.name}</span>
                            </div>
                            <div className="signature-pad">
                                {party.signed && party.signatureImage ? (
                                    // 서명이 있으면 이미지 표시
                                    <img src={party.signatureImage} alt={`${party.name} 서명`} className="signature-image"/>
                                ) : (
                                    // 서명이 없으면 부모로부터 받은 함수를 실행하는 버튼 표시
                                    <button className="btn-primary" onClick={() => onOpenSignatureModal(party)}>서명하기</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default ContractContent;
