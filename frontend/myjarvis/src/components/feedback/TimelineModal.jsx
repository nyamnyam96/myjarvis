import React from "react";
import { TimelineItem } from "./TimelineList"; //  분리 안 하고 내부 export한 컴포넌트 사용

const TimelineModal = ({ items, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-40 flex items-center justify-center z-50">
      <div className="relative bg-white dark:bg-[#1e213a] w-full max-w-3xl rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">

        {/* 제목 */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          전체 히스토리 보기
        </h2>

        {/* TimelineItem 재사용으로 완전 동일한 형식 출력 */}
        <ul className="timeline-list space-y-5">
          {items.map((item, idx) => (
            <TimelineItem key={idx} item={item} animated={false} />
          ))}
        </ul>

        {/* 하단 닫기 버튼 */}
        <div className="flex justify-end mt-6">
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:opacity-90 transition"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimelineModal;
