/*
  계약 연동 일정 표시, 개인 일정 포함

  - 계약별 일정 자동 생성
  - 개인 일정 수동 추가 기능
  - 계약 일정과 개인 일정 색상 구분
  - 진행퓰 표시(막대 또는 퍼센트로)
  - 일정 클릭 시, 상세 팝업 보기
*/

import React, { useState } from 'react';
import ContractList from './ContractList';
import MySchedule from './MySchedule';
import DailyWorkList from './DailyWorkList';
import './ScheduleMain.css';

// 샘플 계약 데이터(자동 생성)
const initialContracts = [
  {
    id: 1,
    name: 'A사 공급계약',
    status: '진행중',
    progress: 60,
    schedules: [
      { id: 101, title: '계약서 작성', date: '2025-06-28', done: true },
      { id: 102, title: '1차 납품', date: '2025-07-05', done: false },
    ],
  },
  {
    id: 2,
    name: 'B사 유지보수',
    status: '대기',
    progress: 0,
    schedules: [
      { id: 201, title: 'Kick-off 미팅', date: '2025-07-01', done: false },
    ],
  },
];

// 일정/작업 관리 메인: 계약 연도 일정, To-do, 리마인더 등 탭 연결
function ScheduleMain() {
  const [tab, setTab] = useState('month');
  // 계약별 일정 자동 생성(최초 1회)
  const [contracts, setContracts] = useState(initialContracts);
  // 개인 일정 수동 추가
  const [personal, setPersonal] = useState([
    { id: 1, title: '팀 미팅', date: '2025-06-30', color: '#4caf50', detail: '주간 업무 공유', done: false, start: '10:00' },
    { id: 2, title: '개인 업무', date: '2025-07-01', color: '#2196f3', detail: '코드 리뷰', done: false, start: '14:00' },
  ]);

  // 개인 일정 추가 핸들러(월간/주간/일간 탭에서만 노출)
  const handleAddPersonal = (schedule) => {
    setPersonal(prev => [
      { ...schedule, id: Date.now() },
      ...prev
    ]);
  };

  return (
    <div className="schedulemain-container">
      <h2>일정 통합 관리</h2>
      <div className="schedulemain-tabs">
        <button onClick={() => setTab('month')} className={tab === 'month' ? 'active' : ''}>월간</button>
        <button onClick={() => setTab('week')} className={tab === 'week' ? 'active' : ''}>주간</button>
        <button onClick={() => setTab('day')} className={tab === 'day' ? 'active' : ''}>일간</button>
        <button onClick={() => setTab('todo')} className={tab === 'todo' ? 'active' : ''}>To-do</button>
      </div>
      <div className="schedulemain-content">
        {tab === 'month' && <ContractList contracts={contracts} />}
        {(tab === 'week' || tab === 'day') && (
          <MySchedule
            view={tab}
            schedules={personal}
            onAddSchedule={handleAddPersonal}
          />
        )}
        {tab === 'todo' && <DailyWorkList />}
      </div>
    </div>
  );
}

export default ScheduleMain;