// 📁 Tabs.jsx
// - 목록 필터, 뷰 전환 등 간단한 탭 UI에 사용 (예: 최근순 / 인기순)
// - activeIndex로 현재 탭 상태 전달, onChange(index)로 핸들링

import React from "react";

const Tabs = ({ tabs = [], activeIndex = 0, onChange }) => {
  return (
    <div className="tabs flex gap-2">
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

export default Tabs;
