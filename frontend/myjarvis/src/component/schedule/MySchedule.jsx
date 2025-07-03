import React, { useState } from 'react';
import './Schedule.css';

function MySchedule({ view = 'month' }) {
  const [schedules, setSchedules] = useState([
    { id: 1, title: '팀 미팅', date: '2025-06-30', color: '#4caf50', detail: '주간 업무 공유', done: false, start: '10:00' },
    { id: 2, title: '개인 업무', date: '2025-07-01', color: '#2196f3', detail: '코드 리뷰', done: false, start: '14:00' },
  ]);
  const [input, setInput] = useState('');
  const [date, setDate] = useState('');
  const [color, setColor] = useState('#4caf50');
  const [start, setStart] = useState('09:00');
  const [selected, setSelected] = useState(null);
  const [dragId, setDragId] = useState(null);

  const handleAdd = () => {
    if (input && date) {
      setSchedules([
        ...schedules,
        { id: Date.now(), title: input, date, color, detail: '', done: false, start },
      ]);
      setInput('');
      setDate('');
      setStart('09:00');
    }
  };

  const today = new Date().toISOString().slice(0, 10);

  // 드래그 앤 드롭 이동
  const handleDragStart = id => setDragId(id);
  const handleDrop = (id) => {
    if (dragId && dragId !== id) {
      const idxFrom = schedules.findIndex(s => s.id === dragId);
      const idxTo = schedules.findIndex(s => s.id === id);
      const newArr = [...schedules];
      const [moved] = newArr.splice(idxFrom, 1);
      newArr.splice(idxTo, 0, moved);
      setSchedules(newArr);
    }
    setDragId(null);
  };

  // view별 필터링
  let filtered = schedules;
  if (view === 'week') {
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    filtered = schedules.filter(s => {
      const d = new Date(s.date);
      return d >= weekStart && d <= weekEnd;
    });
  } else if (view === 'day') {
    const todayStr = new Date().toISOString().slice(0, 10);
    filtered = schedules.filter(s => s.date === todayStr);
  }

  return (
    <div className="myschedule-container">
      <h3>{view === 'week' ? '주간 일정' : view === 'day' ? '일간 일정' : '개인 일정'}</h3>
      <div className="myschedule-add">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="일정 제목" />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input type="time" value={start} onChange={e => setStart(e.target.value)} />
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
        <button onClick={handleAdd}>추가</button>
      </div>
      <ul className="myschedule-list">
        {filtered.map(s => (
          <li
            key={s.id}
            className={`myschedule-item${s.date === today ? ' today' : ''}`}
            style={{ borderLeft: `6px solid ${s.color}` }}
            draggable
            onDragStart={() => handleDragStart(s.id)}
            onDragOver={e => e.preventDefault()}
            onDrop={() => handleDrop(s.id)}
            onClick={() => setSelected(s)}
          >
            <span className="myschedule-title">{s.title}</span>
            <span className="myschedule-date">{s.date}</span>
            <span className="myschedule-time">{s.start}</span>
            <span className="myschedule-status">{s.done ? '완료' : '진행중'}</span>
          </li>
        ))}
      </ul>
      {selected && (
        <div className="myschedule-detail-popup">
          <h4>{selected.title}</h4>
          <p>날짜: {selected.date}</p>
          <p>시작: {selected.start}</p>
          <p>상세: {selected.detail || '상세 없음'}</p>
          <button onClick={() => setSelected(null)}>닫기</button>
        </div>
      )}
    </div>
  );
}

export default MySchedule;