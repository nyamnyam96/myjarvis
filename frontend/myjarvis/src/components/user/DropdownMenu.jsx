// ⬇️ DropdownMenu.jsx
// - 필터/옵션/계정설정 드롭다운용 메뉴
// props 차용해서 분기점 작성

import React from 'react';

const DropdownMenu = ({ items = [], onSelect, variant }) => {
  return (
    <div className="bg-white shadow-lg rounded-md w-full max-w-4xl border border-gray-200 p-4 z-50">
      {/* 최근 검색 기록 전용 레이아웃: 상단 제목 + 구분선 */}
      {variant === 'recent' && (
        <>
          <div className="text-sm font-semibold text-gray-800 mb-2">최근 검색 기록</div>
          <hr className="mb-3 border-gray-200" />
        </>
      )}

      {/* 목록 출력 */}
      <ul className="space-y-2">
        {items.length === 0 ? (
          <li className="text-sm text-gray-400">검색 기록이 없습니다.</li>
        ) : (
          items.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer text-sm text-gray-700 hover:bg-gray-100 px-2 py-1 rounded"
              onClick={() => onSelect(item)}
            >
              {item.label}
            </li>
          ))
        )}
      </ul>

      {/* 최근 검색 기록 전용 하단 버튼 */}
      {variant === 'recent' && (
        <div className="mt-3 text-right">
          <button
            type="button"
            className="text-xs text-gray-400 hover:text-red-500 transition-colors"
            // 삭제 기능은 추후 구현 예정
          >
            전체 검색기록 삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
