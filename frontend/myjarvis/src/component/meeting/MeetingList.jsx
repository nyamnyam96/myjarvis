import React, { useEffect, useRef, useState } from 'react';
import SumAndMakeTag from './SumAndMakeTag';

const initialMeetings = [
  { id: 1, title: '주간 회의', date: '2025-06-20', tags: ['업무', '주간'], content: '주간 업무 공유 및 진행 상황 논의.' },
  { id: 2, title: '기획 회의', date: '2025-06-21', tags: ['기획'], content: '신규 프로젝트 기획 및 역할 분담.' },
  { id: 3, title: '디자인 리뷰', date: '2025-06-22', tags: ['디자인'], content: 'UI 개선 사항 피드백 및 적용 논의.' },
  { id: 4, title: '클라이언트 미팅', date: '2025-06-23', tags: ['외부'], content: '고객사 요구사항 정리 및 Q&A 진행.' },
  { id: 5, title: '마케팅 전략 회의', date: '2025-06-24', tags: ['마케팅'], content: '하반기 캠페인 전략 논의 및 채널별 예산 조율.' },
];

function MeetingList({
  meetings: propMeetings,
  setMeetings: propSetMeetings,
  selected: propSelected,
  setSelected: propSetSelected,
  scrollToId
}) {
  const [fallbackMeetings, setFallbackMeetings] = useState(initialMeetings);
  const [fallbackSelected, setFallbackSelected] = useState(null);

  const meetings = propMeetings ?? fallbackMeetings;
  const setMeetings = propSetMeetings ?? setFallbackMeetings;
  const selected = propSelected ?? fallbackSelected;
  const setSelected = propSetSelected ?? setFallbackSelected;

  const itemRefs = useRef({});

  useEffect(() => {
    if (selected && itemRefs.current[selected.id]) {
      itemRefs.current[selected.id].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (selected && !meetings.find(m => m.id === selected.id)) {
      setSelected(null);
    }
  }, [selected, meetings, setSelected]);

  useEffect(() => {
    if (scrollToId && itemRefs.current[scrollToId]) {
      setSelected(meetings.find(m => m.id === scrollToId));
      setTimeout(() => {
        itemRefs.current[scrollToId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [scrollToId, meetings, setSelected]);

  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState('');

  const handleEdit = (meeting) => {
    setEditId(meeting.id);
    setEditContent(meeting.content);
  };

  const handleSaveEdit = (id) => {
    setMeetings(prev => prev.map(m => m.id === id ? { ...m, content: editContent } : m));
    setEditId(null);
  };

  const handleSaveTags = (meetingId, newTags) => {
    setMeetings(prev =>
      prev.map(m =>
        m.id === meetingId ? { ...m, tags: Array.from(new Set([...(m.tags || []), ...newTags])) } : m
      )
    );
  };

  const handleRemoveTag = (meetingId, tag) => {
    setMeetings(prev =>
      prev.map(m =>
        m.id === meetingId ? { ...m, tags: (m.tags || []).filter(t => t !== tag) } : m
      )
    );
  };

  const handleToggleSelect = (meeting) => {
    if (selected?.id === meeting.id) {
      setSelected(null); //  다시 누르면 접힘
    } else {
      setSelected(meeting);
    }
  };

  return (
    <div className="meeting-list-wrapper px-6 py-4">
      <div className="meeting-list-container max-h-[600px] overflow-y-auto space-y-4">

        {meetings.map(m => (
          <div
            key={m.id}
            ref={el => itemRefs.current[m.id] = el}
            className={`meeting-card p-4 rounded-xl shadow-sm 
              bg-white dark:bg-[#2a2e47]
              border border-gray-200 dark:border-[#343951]
              ${selected?.id === m.id ? 'ring-2 ring-indigo-500' : ''}
            `}
          >
            {/* 카드 헤더: 제목 + 날짜 */}
            <div className="meeting-card-header flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold cursor-pointer" onClick={() => handleToggleSelect(m)}
              >{m.title}</h3>
              <span className="text-sm text-gray-500">{m.date}</span>
            </div>

            {/* 카드 바디: 태그 표시 */}
            <div className="meeting-card-body flex flex-wrap gap-2">
              {m.tags?.length > 0 ? (
                m.tags.map(tag => (
                  <span
                    key={tag}
                    className="meeting-tag bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-400">태그 없음</span>
              )}
            </div>

            {/* 카드 상세: 펼침 상태일 때 */}
              {selected?.id === m.id && (
                <div className="meeting-card-detail bg-gray-50 dark:bg-[#21243a] mt-4 p-4 rounded-md">

                  {/* 회의 내용 제목 + 버튼 수평 정렬 */}
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-lg font-bold text-gray-800 dark:text-gray-100">
                      회의 내용
                    </label>

                    <div className="flex gap-2">
                      {editId === m.id ? (
                        <>
                          <button
                            className="bg-gradient-to-r from-[#1E1BFF] to-[#7C3AED] 
                                      text-white font-semibold text-sm py-1.5 px-4 rounded-md 
                                      shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
                            onClick={e => {
                              e.stopPropagation();
                              handleSaveEdit(m.id);
                            }}
                          >
                            저장
                          </button>
                          <button
                            className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100
                                      font-semibold text-sm py-1.5 px-4 rounded-md
                                      hover:opacity-90 transition-all"
                            onClick={e => {
                              e.stopPropagation();
                              setEditId(null);
                            }}
                          >
                            취소
                          </button>
                        </>
                      ) : (
                        <button
                          className="bg-gradient-to-r from-[#1E1BFF] to-[#7C3AED] 
                                    text-white font-semibold text-sm py-1.5 px-4 rounded-md 
                                    shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
                          onClick={e => {
                            e.stopPropagation();
                            handleEdit(m);
                          }}
                        >
                          수정
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 회의 본문 내용 */}
                  {editId === m.id ? (
                    <textarea
                      className="w-full h-24 p-3 border rounded-md bg-white dark:bg-[#2c3a56] 
                                text-sm text-gray-800 dark:text-gray-100 mb-6"
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                    />
                  ) : (
                    <div className="bg-white dark:bg-[#2c3a56] border border-gray-200 dark:border-[#4b5563] 
                                    rounded-md p-3 mb-6">
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{m.content}</p>
                    </div>
                  )}

                  {/* GPT 요약 및 태그 제목 */}
                  <label className="text-base font-bold text-gray-800 dark:text-gray-100 mb-2 block">
                    GPT 요약 및 태그
                  </label>

                  {/* 요약 도구 박스 */}
                  <div className="bg-white dark:bg-[#2c3a56] border border-gray-200 dark:border-[#4b5563] 
                                  rounded-md p-3">
                    <div className="meeting-summary-block">
                      <SumAndMakeTag
                        initialContent={m.content}
                        onSaveTags={(tags) => handleSaveTags(m.id, tags)}
                      />
                    </div>
                  </div>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeetingList;
