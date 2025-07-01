import React, { useState, useEffect } from 'react';
import './MemoFixed.css';

/*
  고정 등록/해제, 우선순위 설정

  - 메모 상단 고정 버튼
  - 고정 해제 시 자동 정렬
  - 우선 순위(상/중/하) 설정 드롭다운
  - 우선순위별 색상 구분
*/

function MemoFixed({ onAddMemo }) {
  // 전역 메모 상태: localStorage 사용
  const [memo, setMemo] = useState(() => localStorage.getItem('globalMemo') || '');
  const [saved, setSaved] = useState(false);
  const [folded, setFolded] = useState(true); // 기본값 true로 변경

  useEffect(() => {
    const savedMemo = localStorage.getItem('globalMemo');
    if (savedMemo !== null) setMemo(savedMemo);
  }, []);

  const handleChange = e => {
    setMemo(e.target.value);
    setSaved(false);
  };
  const handleSave = () => {
    localStorage.setItem('globalMemo', memo);
    setSaved(true);
    if (onAddMemo && memo.trim()) {
      onAddMemo(memo);
      setMemo('');
    }
  };

  if (folded) {
    return (
      <div className="memofixed-folded">
        <button onClick={() => setFolded(false)} className="memofixed-folded-btn">열기</button>
      </div>
    );
  }
  return (
    <div className="memofixed-root">
      <div className="memofixed-header">
        <span className="memofixed-title">포스트잇</span>
        <button onClick={() => setFolded(true)} className="memofixed-close-btn">접기</button>
      </div>
      <textarea
        value={memo}
        onChange={handleChange}
        placeholder="여기에 메모를 남기세요..."
        className="memofixed-textarea"
      />
      <button onClick={handleSave} className={`memofixed-save-btn${saved ? ' saved' : ''}`}>저장</button>
      {saved && <div className="memofixed-saved-msg">저장됨</div>}
    </div>
  );
}

export default MemoFixed;