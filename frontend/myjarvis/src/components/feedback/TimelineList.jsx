// 📆 TimelineList.jsx
// - 계약 이력, 일정 흐름 등을 시각화한 타임라인

import React from 'react';

const TimelineList = ({ items }) => {
  return (
    <div className="timeline-list">
      {items.map((item, idx) => (
        <div className="timeline-item" key={idx}>
          <div className="timeline-content">{item.content}</div>
          <div className="timeline-time">{item.time}</div>
        </div>
      ))}
    </div>
  );
};

export default TimelineList;
