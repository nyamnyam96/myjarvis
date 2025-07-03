// 🧭 Breadcrumb.jsx
// - 현재 위치 경로를 안내하는 컴포넌트
// - "고객 > 계약 > 상세" 와 같은 구조로 표시
// - 사용 예시:
//   <Breadcrumb items={['고객', '계약', '상세']} />

import React from 'react';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="breadcrumb" aria-label="breadcrumb">
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center">
          {idx !== 0 && <span className="breadcrumb-separator">›</span>}
          <span className="breadcrumb-item">{item}</span>
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
