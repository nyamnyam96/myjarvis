import React from "react";
import PropTypes from "prop-types";

/**
 * 업무 리마인더 전체 보기용 모달 (Modal 컴포넌트 미사용)
 */
const NotificationModal = ({ items, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#1e213a] w-full max-w-md rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
        <h2 className="section-title text-gray-800 dark:text-gray-200 mb-4">전체 리마인더</h2>

        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 p-3 rounded-md bg-gray-50 dark:bg-[#2d314f] hover:bg-gray-100 dark:hover:bg-[#3a3e61] transition"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#3f446a] flex items-center justify-center text-gray-600 dark:text-gray-300 text-lg">
                {item.icon}
              </div>
              <div className="flex flex-col text-sm">
                <div className="font-medium text-gray-800 dark:text-gray-100">{item.title}</div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.time}</div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 text-right">
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

NotificationModal.propTypes = {
  items: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NotificationModal;
