// 📜 ActivityCard.jsx
// - 최근 작업, 이력, 활동 기록을 표시하는 카드
// - 아이콘, 설명, 시간 정보를 포함한 리스트 형식
// - 사용 예시:
//   <ActivityCard activities={[{ icon: '✏️', text: '계약 수정', time: '1시간 전' }]} />

import React from 'react';

const ActivityCard = ({ activities = [] }) => {
  return (
    <div className="activity-card">
      {activities.map((activity, idx) => (
        <div className="activity-item" key={idx}>
          <div className="activity-icon">{activity.icon}</div>
          <div>
            <div className="activity-text">{activity.text}</div>
            <div className="activity-time">{activity.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityCard;
