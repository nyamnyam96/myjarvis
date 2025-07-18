import React, { useState } from "react";
import { motion } from "framer-motion";
import TimelineModal from './TimelineModal';

// 타입별 아이콘 매핑
const typeIcon = {
  contract: "📃",
  schedule: "⏰",
  memo: "🗒️",
  task: "✅",
  invoice: "💳",
  report: "🚨",
  alert: "⚠️",
  file: "📁",
};

// 타입별 배지 색상 클래스
const typeBadgeClass = {
  contract: "bg-blue-100 text-blue-600",
  schedule: "bg-green-100 text-green-600",
  memo: "bg-yellow-100 text-yellow-700",
  task: "bg-purple-100 text-purple-600",
  invoice: "bg-red-100 text-red-600",
  report: "bg-orange-100 text-orange-600",
  alert: "bg-rose-100 text-rose-600",
  file: "bg-gray-100 text-gray-600",
};

// 타임라인 항목
const TimelineItem = ({ item, animated }) => {
  const icon = typeIcon[item.type] || "📌";
  const badgeClass = typeBadgeClass[item.type] || "bg-gray-200 text-gray-600";

  const content = (
    <li className="timeline-item hover:bg-gray-100 dark:hover:bg-[#2a2e44] transition-colors duration-200 rounded-lg px-2 py-1 pl-6">
      <span className="absolute w-2 h-2 bg-blue-500 rounded-full left-[-10px] top-2.5"></span>
      <div className="ml-2 flex flex-col gap-1">
        <div className="flex items-center gap-3">
          {/* 아이콘 */}
          <span className="w-5 text-base text-center">{icon}</span>
          {/* 배지 */}
          <span className={`text-xs px-2 py-0.5 rounded whitespace-nowrap ${badgeClass}`}>
            {item.type?.toUpperCase()}
          </span>
          {/* 본문 */}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors duration-200">
            {item.content}
          </span>
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 ml-[2.2rem]">{item.time}</div>
      </div>
    </li>
  );

  return animated ? (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }}
    >
      {content}
    </motion.div>
  ) : (
    content
  );
};

// 메인 컴포넌트
const TimelineList = ({ items }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="chart-card min-h-[300px] h-full">
      {/* 제목 + 버튼 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title text-gray-800 dark:text-gray-200">최근 활동 내역</h2>
        <button
          className="text-xl font-bold text-gray-500 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300"
          onClick={openModal}
          aria-label="전체 타임라인 보기"
        >
          ＋
        </button>
      </div>

      {/* 메인 리스트 (최신 3개만) */}
      <ul className="timeline-list space-y-5">
        {items.slice(0, 3).map((item, idx) => (
          <TimelineItem key={idx} item={item} animated />
        ))}
      </ul>

      {/* 모달: 전체 보기 */}
      {isModalOpen && (
        <TimelineModal items={items} onClose={closeModal} />
      )}
    </div>
  );
};

export default TimelineList;
export { TimelineItem };
