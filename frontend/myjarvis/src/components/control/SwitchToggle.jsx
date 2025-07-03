// 🔘 SwitchToggle.jsx
// - 설정, 켜기/끄기 기능용 토글 스위치

import React from 'react';

const SwitchToggle = ({ checked, onToggle }) => {
  return (
    <div
      className={`switch-toggle ${checked ? 'checked' : ''}`}
      onClick={onToggle}
    >
      <div className="switch-toggle-circle" />
    </div>
  );
};

export default SwitchToggle;
