// 👤 UserAvatar.jsx
// - 사용자 프로필 이미지 표시 (상태 뱃지 포함)

import React from 'react';

const UserAvatar = ({ src, status }) => {
  return (
    <div className="user-avatar">
      <img src={src} alt="프로필" />
      <span className={`status ${status === 'online' ? 'status-online' : 'status-offline'}`} />
    </div>
  );
};

export default UserAvatar;
