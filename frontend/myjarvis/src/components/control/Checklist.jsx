//  Checklist.jsx
// - 할 일 목록, 태스크 관리 등에서 사용되는 체크리스트 컴포넌트
// - items 배열을 받아 출력하며, 각 항목의 checked 상태에 따라 스타일 분기 처리
// - 사용 예시:
//   <Checklist items={[{ label: '계약서 작성', checked: true }, { label: '회의 일정 잡기', checked: false }]} />

import React from 'react';

const Checklist = ({ items = [] }) => {
  return (
    <div className="checklist">
      {items.map((item, index) => (
        <div
          key={index}
          className={`todo-item ${item.checked ? 'todo-checked' : ''}`}
        >
          <input
            type="checkbox"
            checked={item.checked}
            readOnly
            className="todo-checkbox"
          />
          <label className="todo-label">{item.label}</label>
        </div>
      ))}
    </div>
  );
};

export default Checklist;
