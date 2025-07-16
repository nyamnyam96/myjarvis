import React from "react";

const ChecklistModal = ({ items = [], onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#1e213a] w-full max-w-3xl rounded-lg shadow-lg p-6 relative max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold text-gray-400 hover:text-indigo-500"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          전체 TO-DO LIST
        </h2>

        {/* 4개씩 2열 카드 출력 */}
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.id} className="checklist-item-card">
              <span className="checklist-dot" />
              <div className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-100">
                {item.label}
              </div>
              <div className="ml-auto text-xs text-gray-500 dark:text-gray-300">
                {new Date(item.deadline).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChecklistModal;
