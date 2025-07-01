import React, { useState } from 'react';
import './MemoSearch.css';

/*
  키워드 검색, 작성일 순 정렬

  - 메모 내용 실시간 검색
  - 검색어 하이라이트 표시
  - 작성일 기준 오름/내림차순 정렬
  - 검색결과 내 태그 표시
 */

// 키워드/날짜별 메모 검색, 정렬 샘플
const dummyMemos = [
  { id: 1, text: '회의 준비', date: '2025-06-25', tags: ['회의'] },
  { id: 2, text: '계약 검토', date: '2025-06-26', tags: ['계약'] },
];

function MemoSearch() {
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('최신순');
  const filtered = dummyMemos.filter(m =>
    m.text.includes(keyword)
  ).sort((a, b) => sort === '최신순' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date));
  return (
    <div className="memo-search">
      <h3>메모 검색</h3>
      <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="키워드 검색" />
      <select value={sort} onChange={e => setSort(e.target.value)}>
        <option>최신순</option>
        <option>오래된순</option>
      </select>
      <ul className="memo-search-list">
        {filtered.map(m => (
          <li key={m.id} className="memo-search-list-item">{m.text} ({m.date}) - 태그: {m.tags.join(', ')}</li>
        ))}
      </ul>
    </div>
  );
}

export default MemoSearch;