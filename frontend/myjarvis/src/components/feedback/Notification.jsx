// 🔔 Notification.jsx
// - 알림 센터나 알림 드롭다운에서 각각의 알림 항목을 렌더링
// - 아이콘, 제목, 시간 등의 정보를 포함함
// - 사용 예시:
//   <Notification
//     icon="📩"
//     title="새 메시지가 도착했어요"
//     time="3분 전"
//   />

import React from 'react';

const Notification = ({ icon, title, time }) => {
  return (
    <div className="notification">
      <div className="notification-icon">{icon}</div>
      <div className="notification-content">
        <div className="notification-title">{title}</div>
        <div className="notification-time">{time}</div>
      </div>
    </div>
  );
};

export default Notification;
