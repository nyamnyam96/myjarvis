// 📅 CalendarTag.jsx
// - 일정 마감일, 회의 예정일 등 간단한 일정 태그 출력용
// - 사용 예시: <CalendarTag label="D-3" />

import React from 'react';

const CalendarTag = ({ label }) => {
  return (
    <span className="calendar-tag">
      {label}
    </span>
  );
};

export default CalendarTag;
