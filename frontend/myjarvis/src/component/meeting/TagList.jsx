import React, { useState, useEffect } from 'react';
import './TagList.css';

function TagList({ meetings, setMeetings, setTab, setScrollToId }) {
  const [selectedMeeting, setLocalSelectedMeeting] = useState(null);
  const [selectedTags, setLocalSelectedTags] = useState([]); // 다중 태그 선택

  // 전체 태그 목록 추출
  const allTags = Array.from(new Set(meetings.flatMap(m => m.tags || [])));

  // 다중 태그 클릭
  const handleTagClick = (tag) => {
    setLocalSelectedMeeting(null);
    setLocalSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  // 선택된 태그 기준 필터링
  const filtered = selectedTags.length > 0
    ? meetings.filter(m => selectedTags.every(tag => (m.tags || []).includes(tag)))
    : meetings;

  useEffect(() => {
    setLocalSelectedMeeting(null);
  }, [selectedTags]);

  // 본문으로 버튼 클릭 시 회의록 목록 탭으로 이동 및 해당 회의 id 전달
  const handleGoToMainList = (meeting) => {
    if (setTab && setScrollToId) {
      setTab('list');
      setScrollToId(meeting.id);
    }
  };

  return (
    <div>
      <h3>태그별 회의 목록</h3>
      <div className="taglist-tagbar">
        {allTags.length > 0 ? allTags.map(tag => (
          <span
            key={tag}
            className={`meeting-tag${selectedTags.includes(tag) ? ' selected' : ''}`}
            onClick={() => handleTagClick(tag)}
            style={{ marginRight: 6, marginBottom: 4 }}
          >
            {tag}
          </span>
        )) : <span style={{ color: '#bbb' }}>등록된 태그 없음</span>}
      </div>
      <ul className="taglist-list">
        {filtered.map(m => (
          <li
            key={m.id}
            className={`taglist-item${selectedMeeting && selectedMeeting.id === m.id ? ' selected' : ''}`}
          >
            <div className="taglist-summary-row">
              <div>
                <b>{m.title}</b> <span style={{ color: '#888', fontSize: '0.95em' }}>({m.date})</span><br />
                <span className="taglist-participants">참여자: {m.participants || '-'}</span>
              </div>
              <button className="taglist-detail-btn" onClick={() => setLocalSelectedMeeting(m)}>상세보기</button>
            </div>
            {(selectedMeeting && selectedMeeting.id === m.id) ? (
              <div className="meeting-detail">
                <div className="meeting-detail-section">
                  <b style={{ textAlign: 'center', width: '100%' }}>회의 내용:</b>
                  <div style={{ textAlign: 'center', maxWidth: 400, width: '100%' }}>{selectedMeeting.content}</div>
                </div>
                <div className="meeting-detail-btns">
                  <button className="delete-btn"
                    onClick={e => {
                      e.stopPropagation();
                      setMeetings(meetings.filter(mm => mm.id !== m.id));
                      setLocalSelectedMeeting(null);
                    }}
                  >삭제</button>
                  <button className="back-btn"
                    onClick={e => {
                      e.stopPropagation();
                      setLocalSelectedMeeting(null);
                    }}
                  >목록으로</button>
                  <button className="goto-main-btn"
                    onClick={e => {
                      e.stopPropagation();
                      handleGoToMainList(m);
                    }}
                  >본문으로</button>
                </div>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TagList;