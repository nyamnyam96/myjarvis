import React, { useState } from 'react';
import MeetingList from './MeetingList';
import MeetingInsert from './MeetingInsert';
import TagList from './TagList';
import './MeetingMain.css';

// 더미 초기 데이터
const initialMeetings = [
  { id: 1, title: '주간 회의', date: '2025-06-20', tags: ['업무', '주간'], content: '주간 업무 공유 및 진행 상황 논의.' },
  { id: 2, title: '기획 회의', date: '2025-06-21', tags: ['기획'], content: '신규 프로젝트 기획 및 역할 분담.' },
  { id: 3, title: '디자인 리뷰', date: '2025-06-22', tags: ['디자인'], content: 'UI 개선 사항 피드백 및 적용 논의.' },
  { id: 4, title: '클라이언트 미팅', date: '2025-06-23', tags: ['외부'], content: '고객사 요구사항 정리 및 Q&A 진행.' },
  { id: 5, title: '마케팅 전략 회의', date: '2025-06-24', tags: ['마케팅'], content: '하반기 캠페인 전략 논의 및 채널별 예산 조율.' },
];

function MeetingMain() {
  const [tab, setTab] = useState('list');
  const [meetings, setMeetings] = useState(initialMeetings);
  const [mainSelectedMeeting, setMainSelectedMeeting] = useState(null);
  const [scrollToId, setScrollToId] = useState(null);

  return (
      <div className="meeting-main-wrap">
        <div className="meeting-content-title">회의 관리</div>
          <div className="meeting-main-header">
            <div className="meeting-main-tab-buttons flex gap-2">
              <button
                onClick={() => setTab('list')}
                className={`schedule-btn ${tab === 'list' ? 'selected' : 'unselected'}`}
              >
                회의록 목록
              </button>
              <button
                onClick={() => setTab('insert')}
                className={`schedule-btn ${tab === 'insert' ? 'selected' : 'unselected'}`}
              >
                회의록 등록
              </button>
              <button
                onClick={() => setTab('tag')}
                className={`schedule-btn ${tab === 'tag' ? 'selected' : 'unselected'}`}
              >
                태그별 보기
              </button>
            </div>
          </div>

        <div className="meeting-main-tab-content">
          {tab === 'list' && (
            <MeetingList
              meetings={meetings}
              setMeetings={setMeetings}
              setTab={setTab}
              selected={mainSelectedMeeting}
              setSelected={setMainSelectedMeeting}
              scrollToId={scrollToId}
            />
          )}
          {tab === 'insert' && (
            <MeetingInsert
              setMeetings={setMeetings}
              setTab={setTab}
            />
          )}
          {tab === 'tag' && (
            <TagList
              meetings={meetings}
              setMeetings={setMeetings}
              setTab={setTab}
              setSelectedMeeting={setMainSelectedMeeting}
              setScrollToId={setScrollToId}
            />
          )}
        </div>
      </div>
  );
}

export default MeetingMain;
