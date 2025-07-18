// 📄 Notification.jsx

import React, { useState } from "react";
import { motion } from "framer-motion"; 
import NotificationModal from "./NotificationModal";

const Notification = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const visibleItems = items.slice(0, 4);
  const hiddenItems = items.slice(4);

  return (
    <div className="chart-card min-h-[300px] h-full">
      {/* 제목 + 버튼 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title text-gray-800 dark:text-gray-200">업무 리마인더</h2>
        {hiddenItems.length > 0 && (
          <button
            className="text-xl font-bold text-gray-500 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300"
            onClick={() => setIsOpen(true)}
            aria-label="전체 리마인더 보기"
          >
            ＋
          </button>
        )}
      </div>

      {/* 2열 그리드로 4개까지 표시 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visibleItems.map((item, idx) => (
          <motion.div
            key={idx}
            className="notification"
            initial={{ opacity: 0, translateY: 20, scale: 0.98 }}
            animate={{ opacity: 1, translateY: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
          >
            <div className="notification-icon">{item.icon}</div>
            <div className="notification-content">
              <div className="notification-title">{item.title}</div>
              <div className="notification-time">{item.time}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 모달 호출 */}
      {isOpen && <NotificationModal items={items} onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default Notification;
