import React, { useState, useEffect } from 'react';

function TagList({ meetings, setMeetings, setTab, setScrollToId }) {
  const [selectedMeeting, setLocalSelectedMeeting] = useState(null);
  const [selectedTags, setLocalSelectedTags] = useState([]);

  const allTags = Array.from(new Set(meetings.flatMap(m => m.tags || [])));

  const handleTagClick = (tag) => {
    setLocalSelectedMeeting(null);
    setLocalSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filtered = selectedTags.length > 0
    ? meetings.filter(m => selectedTags.every(tag => (m.tags || []).includes(tag)))
    : meetings;

  useEffect(() => {
    setLocalSelectedMeeting(null);
  }, [selectedTags]);

  const handleGoToMainList = (meeting) => {
    if (setTab && setScrollToId) {
      setTab('list');
      setScrollToId(meeting.id);
    }
  };

  return (
    <section className="max-w-[720px] mx-auto py-8 px-4 space-y-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">태그별 회의 목록</h2>

      {/* 태그 선택 바 */}
      <div className="flex flex-wrap gap-2">
        {allTags.length > 0 ? (
          allTags.map(tag => (
            <span
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`cursor-pointer text-sm px-3 py-1 rounded-full border font-medium transition-all duration-150
                ${selectedTags.includes(tag)
                  ? 'bg-gradient-to-r from-[#1E1BFF] to-[#7C3AED] text-white border-transparent shadow-md'
                  : 'bg-gray-200 text-gray-800 border-gray-300 dark:bg-gray-600 dark:text-white dark:border-gray-500'}
              `}
            >
              {tag}
            </span>
          ))
        ) : (
          <span className="text-gray-400">등록된 태그 없음</span>
        )}
      </div>

      {/* 회의 목록 */}
      <ul className="space-y-4">
        {filtered.map(m => {
          const isSelected = selectedMeeting?.id === m.id;
          return (
            <li
              key={m.id}
              className={`border rounded-lg p-4 transition-all duration-150 
                dark:border-gray-600 dark:bg-[#1e2133] 
                ${isSelected ? 'bg-gray-100 dark:bg-[#282c42]' : 'bg-white dark:bg-[#1e2133]'}
              `}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="text-gray-800 dark:text-gray-100">
                  <div className="font-semibold">{m.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">({m.date})</div>
                  <div className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                    참여자: {m.participants || '-'}
                  </div>
                </div>
                <button
                  className="text-sm font-medium text-indigo-600 hover:underline"
                  onClick={() =>
                    isSelected ? setLocalSelectedMeeting(null) : setLocalSelectedMeeting(m)
                  }
                >
                  상세보기
                </button>
              </div>

              {/* 상세 보기 */}
              {isSelected && (
                <div className="mt-4 bg-gray-50 dark:bg-[#2d3148] rounded-md p-4 shadow-sm text-sm text-gray-800 dark:text-gray-200 space-y-4">
                  <div>
                    <div className="font-semibold mb-1">회의 내용:</div>
                    <div className="text-sm">{m.content}</div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      className="px-3 py-1 rounded bg-red-500 text-white hover:brightness-110"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMeetings(meetings.filter(mm => mm.id !== m.id));
                        setLocalSelectedMeeting(null);
                      }}
                    >
                      삭제
                    </button>
                    <button
                      className="px-3 py-1 rounded text-white font-semibold 
                                 bg-gradient-to-r from-[#1E1BFF] to-[#7C3AED] shadow-md 
                                 hover:brightness-110 transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGoToMainList(m);
                      }}
                    >
                      본문
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default TagList;
