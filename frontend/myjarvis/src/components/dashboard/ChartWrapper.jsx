// 📌 ChartWrapper.jsx
// - 통계용 차트나 시각화 데이터를 감싸는 wrapper입니다.
// - 내부에 BarChart, PieChart 등 Chart 컴포넌트를 넣어 사용하세요.

import React from 'react';

const ChartWrapper = ({ children }) => {
  return <div className="chart-wrapper">{children}</div>;
};

export default ChartWrapper;
