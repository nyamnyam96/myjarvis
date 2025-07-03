/*
  최근 메모 우선, 즐겨찾기 메모

  - 최신 작성 순 정렬
  - 중요 메모 즐겨찾기 등록
  - 즐겨찾기 필터 토글
  - 메모 제목/내용 요약 표시
  - 고정/비고정 상태 구분 아이콘
 */

import React, { useState } from 'react';
import MemoFixed from './MemoFixed';
import MemoSearch from './MemoSearch';
import './MemoMain.css';

// 샘플 메모 데이터
const sampleMemos = [
  { id: 1, title: '회의 준비', content: '회의 자료 준비 및 참석자 확인', date: '2025-06-25', fixed: false },
  { id: 2, title: '계약 검토', content: '계약서 3차 검토 및 수정사항 정리', date: '2025-06-26', fixed: true },
  { id: 3, title: '개인 일정', content: '병원 예약(오전 10시)', date: '2025-06-27', fixed: false },
];

// 메모 메인: 최근 메모, 즐겨찾기, 중요 메모 등 탭 연결
function MemoMain() {
  const [tab, setTab] = useState('recent');
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [memos, setMemos] = useState(sampleMemos);

  const handleDelete = (id) => {
    setMemos(memos.filter(m => m.id !== id));
    if (selectedMemo && selectedMemo.id === id) setSelectedMemo(null);
  };

  // 빠른 메모에서 저장 시 최근 메모에 추가
  const handleAddQuickMemo = (text) => {
    if (!text.trim()) return;
    const newMemo = {
      id: Date.now(),
      title: '빠른 메모',
      content: text,
      date: new Date().toISOString().slice(0, 10),
      fixed: false,
    };
    setMemos([newMemo, ...memos]);
  };

  return (
    <div className="memo-main">
      <h2>메모/포스트잇</h2>
      <div className="memo-tab-row">
        <button onClick={() => setTab('recent')}>최근 메모</button>
        <button onClick={() => setTab('fixed')}>고정 메모</button>
        <button onClick={() => setTab('search')}>메모 검색</button>
      </div>
      {tab === 'recent' && (
        <div>
          <h4>최근 메모</h4>
          <ul className="memo-list">
            {memos.map(m => (
              <li key={m.id} className={`memo-list-item${selectedMemo && selectedMemo.id === m.id ? ' selected' : ''}`} onClick={() => setSelectedMemo(m)}>
                <b>{m.title}</b> <span style={{ color: '#888', fontSize: '0.95em' }}>({m.date})</span><br />
                <span>{m.content}</span>
              </li>
            ))}
          </ul>
          {selectedMemo && (
            <div className="memo-detail-overlay" onClick={() => setSelectedMemo(null)}>
              <div className="memo-detail" onClick={e => e.stopPropagation()}>
                <button className="memo-detail-close" onClick={() => setSelectedMemo(null)}>&times;</button>
                <h3 className="memo-detail-title">{selectedMemo.title}</h3>
                <div className="memo-detail-date">{selectedMemo.date}</div>
                <div className="memo-detail-content">{selectedMemo.content}</div>
                {selectedMemo.fixed && <div className="memo-detail-fixed">[고정 메모]</div>}
              </div>
            </div>
          )}
        </div>
      )}
      {tab === 'fixed' && (
        <div>
          <h4>고정 메모</h4>
          <ul className="memo-list">
            {memos.filter(m => m.fixed).map(m => (
              <li key={m.id} className="memo-list-item" onClick={() => setSelectedMemo(m)}>
                <b>{m.title}</b> <span style={{ color: '#888', fontSize: '0.95em' }}>({m.date})</span><br />
                <span>{m.content}</span>
              </li>
            ))}
          </ul>
          {selectedMemo && (
            <div className="memo-detail-overlay" onClick={() => setSelectedMemo(null)}>
              <div className="memo-detail" onClick={e => e.stopPropagation()}>
                <button className="memo-detail-close" onClick={() => setSelectedMemo(null)}>&times;</button>
                <h3 className="memo-detail-title">{selectedMemo.title}</h3>
                <div className="memo-detail-date">{selectedMemo.date}</div>
                <div className="memo-detail-content">{selectedMemo.content}</div>
                {selectedMemo.fixed && <div className="memo-detail-fixed">[고정 메모]</div>}
              </div>
            </div>
          )}
          <MemoFixed onAddMemo={handleAddQuickMemo} />
        </div>
      )}
      {tab === 'search' && <MemoSearch />}
      {/* 포스트잇(빠른 메모) 항상 렌더링, onAddMemo 항상 전달 */}
      <MemoFixed onAddMemo={handleAddQuickMemo} />
    </div>
  );
}

export default MemoMain;