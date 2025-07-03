// 🗓️ ScheduleCard.jsx
// - 단일 일정 아이템 박스 (날짜 + 제목)
// - 회의나 계약 일정 등을 카드 형태로 출력
// - 사용 예시:
//   <ScheduleCard date="2025-07-15" title="계약서 마감" />

import React from 'react';

const ScheduleCard = ({ date, title }) => {
  return (
    <div className="schedule-card">
      <p className="schedule-date">{date}</p>
      <h3 className="schedule-title">{title}</h3>
    </div>
  );
};

export default ScheduleCard;
