import React, { useEffect, useRef, useState } from 'react';
import SumAndMakeTag from './SumAndMakeTag';
import './MeetingList.css';

/*
  태그 기반 필터, 고객사별 보기

  - 태그 다중 선택  
  - 태그 자동 완성 입력
  - 필터 초기화 버튼
  - 고객사 선택 드롭 다운
  - 고객사별 회의 리스트 출력
  - 회의 요약 / 태그 미리보기

*/

// 회의록 리스트, 태그/필터 기능 샘플 + 회의 내용 보기
const initialMeetings = [
  { id: 1, title: '주간 회의', date: '2025-06-20', tags: ['업무', '주간'], content: '주간 업무 공유 및 진행 상황 논의.' },
  { id: 2, title: '기획 회의', date: '2025-06-21', tags: ['기획'], content: '신규 프로젝트 기획 및 역할 분담.' },
];

function MeetingList({ meetings, setMeetings, setTab, selected, setSelected, scrollToId }) {
  // 각 회의 li에 ref를 연결
  const itemRefs = useRef({});

  // 외부에서 selected가 바뀌면 상세 포커스 및 스크롤 이동
  useEffect(() => {
    if (selected && itemRefs.current[selected.id]) {
      itemRefs.current[selected.id].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (selected && !meetings.find(m => m.id === selected.id)) {
      setSelected(null);
    }
  }, [selected, meetings, setSelected]);

  // 외부에서 scrollToId가 들어오면 해당 회의로 이동 및 상세 오픈
  useEffect(() => {
    if (scrollToId && itemRefs.current[scrollToId]) {
      setSelected(meetings.find(m => m.id === scrollToId));
      setTimeout(() => {
        if (itemRefs.current[scrollToId]) {
          itemRefs.current[scrollToId].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [scrollToId, meetings, setSelected]);

  const handleTagClick = () => {
    if (setTab) {
      setTab('tag');
    }
  };

  const handleSaveTags = (meetingId, newTags) => {
    setMeetings(prev => prev.map(m => m.id === meetingId ? { ...m, tags: Array.from(new Set([...(m.tags || []), ...newTags])) } : m));
  };

  // 태그 삭제 핸들러
  const handleRemoveTag = (meetingId, tag) => {
    setMeetings(prev => prev.map(m => m.id === meetingId ? { ...m, tags: (m.tags || []).filter(t => t !== tag) } : m));
  };

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

  const filtered = meetings;

  return (
    <div>
      <h3>회의록 목록</h3>
      <ul className="meeting-list">
        {filtered.map(m => (
          <li
            key={m.id}
            ref={el => itemRefs.current[m.id] = el}
            className={`meeting-list-item${selected && selected.id === m.id ? ' selected' : ''}`}
            onClick={() => setSelected(m)}
          >
            <b className="meeting-title">{m.title}</b> <span className="meeting-date">({m.date})</span><br />
            <span>
              태그: {m.tags && m.tags.length > 0 ? m.tags.map((tag, idx) => (
                <React.Fragment key={tag}>
                  <span className="meeting-tag" onClick={e => { e.stopPropagation(); handleTagClick(tag); }}>
                    {tag}
                    {selected && selected.id === m.id && (
                      <button
                        className="meeting-tag-remove"
                        onClick={e => { e.stopPropagation(); handleRemoveTag(m.id, tag); }}
                        title="태그 삭제"
                      >×</button>
                    )}
                  </span>
                  {idx < m.tags.length - 1 && <span className="meeting-tag-comma">, </span>}
                </React.Fragment>
              )) : '없음'}
            </span>
            {selected && selected.id === m.id && (
              <div className="meeting-detail">
                <div className="meeting-detail-section">
                  <b>회의 내용:</b>
                  <div>{editId === m.id ? (
                    <textarea
                      className="meeting-edit-textarea"
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      rows={4}
                    />
                  ) : (
                    selected.content
                  )}
                  <div className="meeting-detail-btns-bottom">
                    {editId === m.id ? (
                      <>
                        <button className="meeting-detail-save-btn" onClick={e => { e.stopPropagation(); handleSaveEdit(m.id); }}>저장</button>
                        <button className="meeting-detail-cancel-btn" onClick={e => { e.stopPropagation(); setEditId(null); }}>취소</button>
                      </>
                    ) : (
                      <button className="meeting-detail-edit-btn" onClick={e => { e.stopPropagation(); handleEdit(m); }}>수정</button>
                    )}
                  </div>
                  </div>
                </div>
                <div className="meeting-detail-section">
                  <SumAndMakeTag
                    initialContent={selected.content}
                    onSaveTags={tags => handleSaveTags(selected.id, tags)}
                  />
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MeetingList;