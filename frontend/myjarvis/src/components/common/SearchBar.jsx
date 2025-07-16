import React from 'react';

const SearchBar = ({
  placeholder = "검색어를 입력하세요",
  value,
  onChange,
  onFocus,
  inputRef,
}) => {
  return (
    <div className="relative w-full group">
      {/* 좌측 돋보기 아이콘 */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 text-sm transition-transform duration-200 group-focus-within:scale-110">
        🔍
      </span>

      {/* 입력창 */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        className="
          pl-10 pr-14 py-2 w-full rounded-full
          bg-[#e9effd] dark:bg-[#2c2e45]
          border border-gray-200 dark:border-[#3a3d55]
          text-sm text-gray-800 dark:text-white
          shadow-sm hover:shadow-md
          focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-[#4c5cff33]
          transition-all
        "
      />

      {/* 우측 X 버튼 */}
      {value && (
        <button
          onClick={() => onChange({ target: { value: "" } })}
          className="
            absolute right-6 top-1/2 -translate-y-1/2
            w-5 h-5 flex items-center justify-center
            text-gray-400 dark:text-white
            hover:text-gray-600 dark:hover:text-gray-300
            hover:bg-gray-200 dark:hover:bg-[#3d4160]
            rounded-full transition-colors
          "
          aria-label="검색어 초기화"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;
