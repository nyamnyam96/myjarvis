// src/component/contract/detail/ContractContent.jsx

import { forwardRef } from 'react';
import './ContractContent.css';

const ContractContent = forwardRef(({ content, parties, onOpenSignatureModal, loginMember }, ref) => {
    const createMarkup = () => ({ __html: content });

    return (
        <div className="contract-content-wrap" ref={ref}>
            <div className="editor-content-view" dangerouslySetInnerHTML={createMarkup()} />

            <div className="signature-section">
                <h3>서명</h3>
                <div className="signature-grid">
                    {/* 👇 [핵심] 이제 부모가 준 parties 배열을 그대로 map으로 돌려서 그립니다. */}
                    {parties.map((party) => {
                        // "현재 로그인한 유저가 이 서명란의 주인인가?"를 판단합니다.
                        const isCurrentUserTurn = loginMember && (party.partyId === loginMember.memberNo);

                        return (
                            <div key={party.partyId || party.memberNo} className="signature-box">
                                <div className="party-info">
                                    <span className="party-role">{party.role}</span>
                                    <span className="party-name">{party.name}</span>
                                </div>
                                <div className="signature-pad">
                                    {party.signed && party.signatureImage ? (
                                        // 1. 서명이 완료되었으면 -> 서명 이미지 표시
                                        <img src={party.signatureImage} alt={`${party.name} 서명`} className="signature-image"/>
                                    ) : isCurrentUserTurn ? (
                                        // 2. 서명이 안됐고, 내 서명 차례이면 -> '서명하기' 버튼 표시
                                        <button className="btn-primary" onClick={() => onOpenSignatureModal(party)}>
                                            서명하기
                                        </button>
                                    ) : (
                                        // 3. 서명이 안됐고, 내 차례가 아니면 -> '서명 대기 중' 텍스트 표시
                                        <p className="unsigned-text">서명 대기 중</p>
                                    )}
                                </div>
                                {party.signed && party.signedDate && (
                                    <span className="signed-date-display">{party.signedDate}</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});

export default ContractContent;