//  TimelineList.jsx
// - 계약 이력, 일정 흐름 등을 시각화한 타임라인

import React from 'react';
import { motion } from 'framer-motion';

const TimelineList = ({ items }) => {
  return (
    <div className="timeline-list">
      {items.map((item, idx) => (
        <motion.div
          className="timeline-item"
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
        >
          <div className="timeline-content hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            {item.content}
          </div>
          <div className="timeline-time">{item.time}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default TimelineList;
