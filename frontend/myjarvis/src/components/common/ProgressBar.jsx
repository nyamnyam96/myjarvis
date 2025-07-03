// ⏳ ProgressBar.jsx
// - 계약 진행률, 일정 완료율 등 다양한 상황에서 퍼센트 기반 진행률 시각화
// - percent (0~100) 값과 label 텍스트를 받아 렌더링
// - 사용 예시: <ProgressBar percent={70} label="진행률 70%" />

import React from 'react';

const ProgressBar = ({ percent = 0, label = '' }) => {
  return (
    <div>
      {/* 진행률 바 바깥 레이어 */}
      <div className="progress-bar">
        {/* 실제 채워지는 영역 */}
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
      {/* 우측 진행률 텍스트 라벨 */}
      <div className="progress-label">{label}</div>
    </div>
  );
};

export default ProgressBar;
