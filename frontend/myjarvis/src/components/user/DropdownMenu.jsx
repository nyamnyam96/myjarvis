// ⬇️ DropdownMenu.jsx
// - 필터/옵션/계정설정 드롭다운용 메뉴
// props 차용해서 분기점 작성

import React from 'react';

const DropdownMenu = ({ items = [], onSelect, variant }) => {
  return (
    <div className="bg-white dark:bg-[#21243a] text-gray-800 dark:text-white shadow-lg rounded-md w-full max-w-4xl border border-gray-200 dark:border-[#3a3d55] p-4 z-50">
      {/* 최근 검색 기록 제목 */}
      {variant === 'recent' && (
        <>
          <div className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
            최근 검색 기록
          </div>
          <hr className="mb-3 border-gray-200 dark:border-[#3a3d55]" />
        </>
      )}

      {/* 검색 목록 */}
      <ul className="space-y-2">
        {items.length === 0 ? (
          <li className="text-sm text-gray-400 dark:text-gray-500">검색 기록이 없습니다.</li>
        ) : (
          items.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#353856] px-2 py-1 rounded transition-colors"
              onClick={() => onSelect(item)}
            >
              {item.label}
            </li>
          ))
        )}
      </ul>

      {/* 삭제 버튼 */}
      {variant === 'recent' && (
        <div className="mt-3 text-right">
          <button
            type="button"
            className="text-xs text-gray-400 dark:text-gray-500 hover:text-red-500 transition-colors"
          >
            전체 검색기록 삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
