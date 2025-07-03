// 📈 ChartCard.jsx
// - 통계 차트 또는 시각화 데이터를 출력하는 박스 UI
// - 내부에 <BarChart />, <LineChart /> 등의 차트 컴포넌트를 포함 가능
// - 사용 예시:
//   <ChartCard title="매출 추이" subtext="최근 6개월 기준">
//     <BarChart ... />
//   </ChartCard>

import React from 'react';

const ChartCard = ({ title, subtext, children }) => {
  return (
    <div className="chart-card">
      <h3 className="chart-title">{title}</h3>
      <p className="chart-subtext">{subtext}</p>
      <div className="chart-container">{children}</div>
    </div>
  );
};

export default ChartCard;
