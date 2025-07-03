/*
  계약 상세 내 메모, 회의록 내 메모

  - 계약 또는 회의 화면 우측 메모 창 고정
  - 해당 페이지 ID 자동 연동
  - 연동 대상별 메모 구분 표시
  - 입력 후 자동 저장 기능
  - 메모 수정/삭제 권한 제한 설정
 */

import React, { useState } from 'react';
import './MemoInsert.css';

// 메모 등록, 페이지별/연동 메모 구분 샘플
function MemoInsert() {
  const [text, setText] = useState('');
  const [type, setType] = useState('일반');
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('메모가 등록되었습니다! (실제 저장 로직 필요)');
    setText('');
  };
  return (
    <form onSubmit={handleSubmit} className="memo-insert-form">
      <h3>메모 등록</h3>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="메모 내용" rows={3} required />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="일반">일반 메모</option>
        <option value="페이지별">페이지별 메모</option>
        <option value="연동">연동 메모</option>
      </select>
      <button type="submit">등록</button>
    </form>
  );
}

export default MemoInsert;