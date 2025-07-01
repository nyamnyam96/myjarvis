/*
  계약별 일정 보기, 상태에 따른 일정 표시

  - 계약명 기준으로 일정 그룹핑
  - 계약상태(진행,완료 등) 필터 제공
  - 상태별 일정 강조 표시(색상 또는 뱃지)
  - 검색 기능(계약명, 날짜 기준)
*/

import React, { useState } from 'react';
// import './ContractList.css';

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

function ContractList() {
  const [contracts, setContracts] = useState(initialContracts);
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState('month'); // month, week, day

  // 진행률 계산
  const getProgress = (schedules) =>
    schedules.length
      ? Math.round((schedules.filter(s => s.done).length / schedules.length) * 100)
      : 0;

  return (
    <div className="contractlist-container">
      {tab === 'week' && <h3 style={{marginTop:'16px'}}>주간 일정</h3>}
      {tab === 'day' && <h3 style={{marginTop:'16px'}}>일간 일정</h3>}
      <ul className="contractlist-list">
        {contracts.map(contract => (
          <li key={contract.id} className={`contractlist-item status-${contract.status}`}>
            <div className="contractlist-summary" onClick={() => setSelected(contract)}>
              <b>{contract.name}</b>
              <span className="contractlist-status">{contract.status}</span>
              <span className="contractlist-progress">{getProgress(contract.schedules)}%</span>
            </div>
            {selected && selected.id === contract.id && (
              <div className="contractlist-detail-popup">
                <h4>{contract.name} 상세</h4>
                <ul>
                  {contract.schedules.map(s => (
                    <li key={s.id}>
                      <span>{s.title} ({s.date})</span>
                      <span>{s.done ? '완료' : '진행중'}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => setSelected(null)}>닫기</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContractList;