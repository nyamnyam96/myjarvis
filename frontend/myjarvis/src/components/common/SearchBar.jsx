// 🔍 SearchBar.jsx
// - 상단바나 필터 영역에서 사용하는 검색 입력창 컴포넌트

import React from 'react';

const SearchBar = ({ placeholder = "검색어를 입력하세요", value, onChange, onFocus, inputRef }) => {
  return (
    <div className="w-full"> {/*  불필요한 .search-bar 제거 */}
      <input
        type="text"
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        className="input w-full" // input 테두리는 input 클래스에서만
      />
    </div>
  );
};


export default SearchBar;

