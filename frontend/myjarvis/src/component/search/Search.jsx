import React, { useState, useRef, useEffect } from 'react';
import SearchBar from '../../components/common/SearchBar';
import DropdownMenu from '../../components/user/DropdownMenu';
import SearchResultItem from '../../component/search/SearchResultItem';
import './Search.css';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({});

  const recentSearches = [
    { label: '계약서' },
    { label: '세금계산서' },
    { label: '전자서명' },
  ];

  const searchResults = [
    {
      id: 1,
      category: '계약관리',
      date: '2024-07-07 14:30',
      content: '7월까지 계약마감일정 있을 예정',
    },
    {
      id: 2,
      category: '회의관리',
      date: '2024-07-05 10:15',
      content: '회의에서 논의된 일정 자동 등록',
    },
    {
      id: 3,
      category: '대시보드',
      date: '2024-07-03 09:00',
      content: '개인 대시보드에서 일정 확인 가능',
    },
    {
      id: 4,
      category: '설정',
      date: '2024-07-01 08:45',
      content: '외부 캘린더와 일정 연동 설정 가능',
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (showDropdown && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: 'absolute',
        top: `${rect.bottom + window.scrollY + 4}px`,
        left: `${rect.left + window.scrollX}px`,
        width: `${rect.width}px`,
        zIndex: 50,
      });
    }
  }, [showDropdown]);

  //  다양한 키워드 대응 필터링
  const matchedResults = searchResults
    .filter((item) =>
      item.category.includes(inputValue) || item.content.includes(inputValue)
    )
    .map((result) => ({
      ...result,
      breadcrumbPath: ['메인', result.category],
      tags: ['검색'],
    }));

  return (
    <div className="flex flex-col items-center px-4">
      <div className="search-header-card relative" ref={wrapperRef}>
        <h2 className="section-title mb-2">검색</h2>
        <SearchBar
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          inputRef={inputRef}
        />
      </div>

      {showDropdown && (
        <div style={dropdownStyle}>
          <DropdownMenu
            items={recentSearches}
            variant="recent"
            onSelect={(item) => {
              setInputValue(item.label);
              setShowDropdown(false);
            }}
          />
        </div>
      )}

      {/*  검색 결과 있을 때 */}
      {inputValue.trim() && matchedResults.length > 0 && (
        <div className="card mt-4 p-4 w-full max-w-4xl">
          <h3 className="text-base font-semibold mb-2">
            🔍 '{inputValue}' 검색 결과
          </h3>
          <ul className="space-y-2">
            {matchedResults.map((result) => (
              <SearchResultItem
                key={result.id}
                category={result.category}
                content={result.content}
                keyword={inputValue}
                date={result.date}
                breadcrumbPath={result.breadcrumbPath}
                tags={result.tags}
              />
            ))}
          </ul>
        </div>
      )}

      {/*  검색 결과 없을 때 메시지 표시 */}
      {inputValue.trim() && matchedResults.length === 0 && (
        <div className="card mt-4 p-4 w-full max-w-4xl text-sm text-gray-500">
          '{inputValue}'에 대한 검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export default Search;
