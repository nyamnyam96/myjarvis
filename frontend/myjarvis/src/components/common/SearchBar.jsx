import React from 'react';

const SearchBar = ({ placeholder = "검색어를 입력하세요", value, onChange, onFocus, inputRef }) => {
  return (
    <div className="relative w-full group">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-transform duration-200 group-focus-within:scale-110">
        🔍
      </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        className="pl-10 pr-14 py-2 w-full rounded-full 
                  bg-[#f4f7fe] border border-gray-200 
                  focus:outline-none focus:ring-2 focus:ring-blue-100 
                  text-sm shadow-sm hover:shadow-md transition-all"
      />
      {value && (
        <button
          onClick={() => onChange({ target: { value: "" } })}
          className="absolute right-6 top-1/2 -translate-y-1/2 
                    w-5 h-5 flex items-center justify-center 
                    text-gray-400 hover:text-gray-600 
                    hover:bg-gray-200 rounded-full transition-colors"
          aria-label="검색어 초기화"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;
