// 🔍 SearchBar.jsx
// - 상단바나 필터 영역에서 사용하는 검색 입력창 컴포넌트

import React from 'react';

const SearchBar = ({ placeholder = "검색어를 입력하세요", value, onChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
