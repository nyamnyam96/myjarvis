// Checklist.jsx
// - Dashboard의 TO-DO LIST 카드 전용 컴포넌트
// - ChartCard와 동일한 스타일 적용
// - 카드 외곽선 제거, 내부 항목 크기 확장
import React, { useState } from "react";
import ChecklistModal from "./ChecklistModal";

const Checklist = ({ items = [], onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  // 마감일 기준 정렬
  const sortedItems = [...items].sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );

  // 최대 6개까지만 표시
  const previewItems = sortedItems.slice(0, 6);
  const leftItems = previewItems.slice(0, 3);
  const rightItems = previewItems.slice(3);

  return (
    <div className="chart-card min-h-[300px] h-full">
      {/* 제목 영역 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          TO-DO LIST
        </h2>
        <button
          onClick={() => setIsOpen(true)}
          className="text-xl font-bold text-gray-500 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300"
          title="전체 보기"
        >
          ＋
        </button>
      </div>

      {/* 리스트 영역: 높이 고정 없이 자연스럽게 구성 */}
      <div className="flex items-start gap-6">
        {/* 좌측 3개 */}
        <div className="flex flex-col gap-4 w-1/2">
          {leftItems.map((item, index) => (
            <div
              key={item.id}
              className={`
                flex items-center bg-gray-50 dark:bg-[#3a3e5a] px-4 py-4 rounded-lg shadow-sm
                hover:bg-indigo-100 dark:hover:bg-indigo-500/10
                hover:shadow-md transition-all duration-300 ease-in-out
                animate-fade-up animate-delay-[${index * 100}ms]
              `}
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
              <div className="flex-1 text-base font-medium text-gray-800 dark:text-gray-100">
                {item.label}
              </div>
              <div className="ml-auto text-sm text-gray-500 dark:text-gray-300">
                {new Date(item.deadline).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 중앙 구분선: 높이는 좌우 내용에 맞춰 자동 조절 */}
        <div className="w-px min-h-[200px] bg-gray-300 dark:bg-gray-600" />

        {/* 우측 3개 */}
        <div className="flex flex-col gap-4 w-1/2">
          {rightItems.map((item, index) => (
            <div
              key={item.id}
              className={`
                flex items-center bg-gray-50 dark:bg-[#3a3e5a] px-4 py-4 rounded-lg shadow-sm
                hover:bg-indigo-100 dark:hover:bg-indigo-500/10
                hover:shadow-md transition-all duration-300 ease-in-out
                animate-fade-up animate-delay-[${(index + 3) * 100}ms]
              `}
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
              <div className="flex-1 text-base font-medium text-gray-800 dark:text-gray-100">
                {item.label}
              </div>
              <div className="ml-auto text-sm text-gray-500 dark:text-gray-300">
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

      {/* 전체 보기 모달 */}
      {isOpen && (
        <ChecklistModal
          items={sortedItems}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Checklist;
