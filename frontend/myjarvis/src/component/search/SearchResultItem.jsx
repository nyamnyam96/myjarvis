import React from 'react';
import Breadcrumb from '../../components/navigation/Breadcrumb';
import './SearchResultItem.css'; // 신규 CSS 적용

const SearchResultItem = ({
  category = '',
  date = '',
  content = '',
  keyword = '',
  breadcrumbPath = [],
  tags = [],
}) => {
  const highlightKeyword = (text, keyword) => {
    if (!text || !keyword) return text;
    const regex = new RegExp(`(${keyword})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="font-semibold text-primary">{part}</span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <li className="search-result-item">
      {/* 메뉴 경로 */}
      {breadcrumbPath.length > 0 && (
        <Breadcrumb
          paths={breadcrumbPath}
          className="text-sm text-gray-400 dark:text-gray-300"
        />
      )}

      {/* 카테고리 */}
      <p className="font-medium">
        {highlightKeyword(category, keyword)}
      </p>

      {/* 내용 */}
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {highlightKeyword(content, keyword)}
      </p>

      {/* 날짜 + 태그 */}
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-400 dark:text-gray-400">{date}</span>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, idx) => (
              <span key={idx} className="badge-outline text-xs">#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </li>
  );
};

export default SearchResultItem;
