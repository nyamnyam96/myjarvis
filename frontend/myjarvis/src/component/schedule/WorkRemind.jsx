import React, { useState } from 'react';
import './WorkRemind.css';

function WorkRemind({ tab }) {
  const [reminders, setReminders] = useState([
    { id: 1, text: 'A사 1차 납품 3일 전', type: '계약', date: '2025-07-02', read: false },
    { id: 2, text: 'To-do: 회의록 정리 마감', type: 'To-do', date: '2025-06-30', read: false },
  ]);
  const [showAll, setShowAll] = useState(true);

  const handleRead = (id) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, read: true } : r));
  };

  let title = '알림';
  if (tab === 'week') title = '주간 일정';
  if (tab === 'day') title = '일간 일정';

  return (
    <div className="workremind-container">
      {/* 월간, 주간, 일간 버튼은 WorkRemind에서는 사용하지 않으므로 삭제/미표시 */}
      <h3>{title}</h3>
      <label>
        <input type="checkbox" checked={showAll} onChange={e => setShowAll(e.target.checked)} />
        전체 알림 보기
      </label>
      <ul className="workremind-list">
        {reminders
          .filter(r => showAll || !r.read)
          .map(r => (
            <li key={r.id} className={`workremind-item${r.read ? ' read' : ''}`}>
              <span className="workremind-type">{r.type}</span>
              <span className="workremind-text">{r.text}</span>
              <span className="workremind-date">{r.date}</span>
              {!r.read && (
                <button className="workremind-read-btn" onClick={() => handleRead(r.id)}>
                  확인
                </button>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default WorkRemind;