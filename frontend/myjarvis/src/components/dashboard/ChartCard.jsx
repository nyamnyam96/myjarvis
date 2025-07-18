//  ChartCard.jsx
// - 통계 차트 또는 시각화 데이터를 출력하는 박스 UI
// - 내부에 <BarChart />, <LineChart /> 등의 차트 컴포넌트를 포함 가능
// - 사용 예시:
//   <ChartCard title="매출 추이" subtext="최근 6개월 기준">
//     <BarChart ... />
//   </ChartCard>
// src/components/dashboard/ChartCard.jsx

import React, { useMemo, useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, LabelList, ResponsiveContainer,
  PieChart, Pie, Cell, Sector,
} from "recharts";

// Pie 조각 hover 시 커지는 효과
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius + 8}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
};

const ChartCard = ({ barData, pieData }) => {
  const lightPieColors = ['#d1d5db', '#7dd3fc', '#6ee7b7', '#f9a8d4'];
  const darkPieColors = ['#9ca3af', '#38bdf8', '#10b981', '#ec4899'];

  // pieColors 상태값으로 관리
  const [pieColors, setPieColors] = useState(lightPieColors);
  const [activeIndex, setActiveIndex] = useState(null);

  // 다크모드 감지하여 pie 색상 설정
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setPieColors(isDarkMode ? darkPieColors : lightPieColors);
  }, []);

  const { trend, isUp } = useMemo(() => {
    const prev = barData?.[0]?.계약 || 0;
    const curr = barData?.[1]?.계약 || 0;
    const change = curr - prev;
    const percent = prev === 0 ? 100 : ((change / prev) * 100).toFixed(1);
    return {
      trend: `${percent > 0 ? "+" : ""}${percent}%`,
      isUp: percent >= 0,
    };
  }, [barData]);

  const trendColor = isUp ? "text-red-500" : "text-blue-500";
  const trendIcon = isUp ? "▲" : "▼";

  return (
    <div className="chart-card">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">최근 계약 활동</h2>

      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            계약 건수 비교
          </h3>
          <span className={`text-xs ${trendColor}`}>{trendIcon} {trend}</span>
        </div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          계약 상태 현황
        </h3>
      </div>

      <div className="flex items-start">
        {/* 막대그래프 */}
        <div className="w-1/2 pr-4">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={barData}
              barSize={40}
              barCategoryGap="50%"
              margin={{ top: 20 }}
            >
              {/* X축 라벨 커스텀 (다크 대응) */}
              <XAxis
                dataKey="name"
                tick={({ x, y, payload }) => (
                  <text
                    x={x}
                    y={y + 15}
                    textAnchor="middle"
                    fontSize="12"
                    className="xaxis-label"
                  >
                    {payload.value}
                  </text>
                )}
                tickLine={false}
                axisLine={false}
              />

              <Bar
              dataKey="계약"
              radius={[6, 6, 0, 0]}
              fill="url(#gradient)"
              isAnimationActive={true}
              animationDuration={800} // 등장 속도
              animationEasing="ease-out"
            >
              <LabelList
                dataKey="계약"
                content={({ x, y, value }) => (
                  <text
                    x={x + 20}
                    y={y - 10}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="600"
                    className="bar-label"
                  >
                    {`${value}건`}
                  </text>
                )}
              />
              
              {/* 막대 개별 색상 지정 (기존 유지) */}
              {barData.map((entry, index) => (
                <Cell key={`bar-cell-${index}`} fill="url(#gradient)" />
              ))}
            </Bar>

              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="border-l border-gray-300 dark:border-gray-600 h-[180px] mx-2" />

        {/* 파이차트 */}
        <div className="flex items-start px-4 py-2 w-1/2">
          <div className="flex-1 flex justify-center">
            <PieChart width={160} height={160}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={70}
                dataKey="value"
                stroke="#fff"
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index]} />
                ))}
              </Pie>
            </PieChart>
          </div>

          <div className="flex flex-col gap-2 ml-12 min-w-[110px]">
            {pieData.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-md px-3 py-1 text-sm flex items-center gap-2 transition duration-200 ease-in-out
                ${activeIndex === idx
                    ? 'bg-blue-100 dark:bg-blue-950 scale-[1.03]'
                    : 'bg-gray-100 dark:bg-[#2c2f48]'
                  }`}
              >
                <span
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: pieColors[idx] }}
                />
                <span className="font-medium">{item.name}</span>
                <span className="ml-auto font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
