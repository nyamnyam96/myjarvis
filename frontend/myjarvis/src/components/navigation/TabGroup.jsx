// 📁 TabGroup.jsx
// - 섹션 전환, 설정/통계/계약 등 주요 페이지 내 탭 전환에 사용
// - activeIndex로 현재 탭 표시, onChange(index)로 탭 전환 핸들링

import React from "react";

const TabGroup = ({ tabs = [], activeIndex = 0, onChange }) => {
  return (
    <div className="tab-group flex gap-6 border-b border-gray-200">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`tab-item ${index === activeIndex ? "active" : ""}`}
          onClick={() => onChange(index)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default TabGroup;
