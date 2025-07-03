import React, { useState } from 'react';
import MeetingInsert from './MeetingInsert';
import MeetingList from './MeetingList';
import TagList from './TagList';
import './MeetingMain.css';

const initialMeetings = [
  { id: 1, title: '주간 회의', date: '2025-06-20', tags: ['업무', '주간'], content: '주간 업무 공유 및 진행 상황 논의.' },
  { id: 2, title: '기획 회의', date: '2025-06-21', tags: ['기획'], content: '신규 프로젝트 기획 및 역할 분담.' },
];

// 회의 관리 메인: 회의록 등록/수정, 파일 업로드, 태그별 보기만 탭으로 노출
function MeetingMain() {
  const [tab, setTab] = useState('list');
  const [meetings, setMeetings] = useState(initialMeetings);
  const [mainSelectedMeeting, setMainSelectedMeeting] = useState(null);
  const [scrollToId, setScrollToId] = useState(null);
  return (
    <div className="meeting-main">
      <h2>회의 관리</h2>
        <button onClick={() => setTab('list')}>회의록 목록</button>
        <button onClick={() => setTab('insert')}>회의록 등록</button>
        <button onClick={() => setTab('tag')}>태그별 보기</button>
      {tab === 'list' && <MeetingList meetings={meetings} setMeetings={setMeetings} setTab={setTab} setSelected={setMainSelectedMeeting} selected={mainSelectedMeeting} scrollToId={scrollToId} />}
      {tab === 'insert' && <MeetingInsert setMeetings={setMeetings} setTab={setTab} />}
      {tab === 'tag' && <TagList meetings={meetings} setMeetings={setMeetings} setTab={setTab} setSelectedMeeting={setMainSelectedMeeting} setScrollToId={setScrollToId} />}
    </div>
  );
}

export default MeetingMain;