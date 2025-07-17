import React, { useState, useEffect } from 'react';
import './Schedule.css';

function MySchedule({ view = 'month' }) {
  const [schedules, setSchedules] = useState([]);
  const [input, setInput] = useState('');
  const [date, setDate] = useState('');
  const [color, setColor] = useState('#4caf50');
  const [start, setStart] = useState('09:00');
  const [selected, setSelected] = useState(null);
  const [dragId, setDragId] = useState(null);
  const [detail, setDetail] = useState("");
  const [desc, setDesc] = useState("");

  // 최초 1회 일정 목록 불러오기 (meeting 방식과 동일하게 fetch)
  useEffect(() => {
    async function fetchSchedules() {
      try {
        const res = await fetch('/api/schedule');
        if (res.ok) {
          const result = await res.json();
          // 예시: result.resData가 배열이라고 가정
          const data = Array.isArray(result.resData)
            ? result.resData.filter(s => s).map(s => ({
                id: s.scheduleNo,
                title: s.title,
                date: s.date,
                color: s.color || '#4caf50',
                detail: s.detail || '',
                done: s.done || false,
                start: s.start || '09:00',
              }))
            : [];
          setSchedules(data);
        } else {
          const errorText = await res.text();
          console.error('서버 오류:', res.status, errorText);
        }
      } catch (e) {
        console.error('네트워크 오류:', e);
      }
    }
    fetchSchedules();
  }, []);

  // 일정 추가 (meeting 방식과 동일하게 POST)
  const handleAdd = async () => {
    if (input && date) {
      const newSchedule = {
        title: input,
        date,
        color,
        detail,
        desc,
        done: false,
        start,
      };
      try {
        const res = await fetch('/api/schedule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSchedule),
        });
        if (res.ok) {
          const saved = await res.json();
          setSchedules([...schedules, {
            ...newSchedule,
            id: saved.scheduleNo || Date.now(),
          }]);
          setInput('');
          setDate('');
          setStart('09:00');
          setDetail('');
          setDesc('');
        } else {
          const errorText = await res.text();
          console.error('추가 실패:', errorText);
        }
      } catch (e) {
        console.error('네트워크 오류:', e);
      }
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
        <select value={detail} onChange={e => setDetail(e.target.value)}>
          <option value="">일정 종류 선택</option>
          <option value="회의">회의</option>
          <option value="업무">업무</option>
          <option value="개인">개인</option>
          <option value="기타">기타</option>
        </select>
        <label style={{width:'100%', marginTop:'4px'}}>
          <span style={{fontSize:'0.95em'}}>일정 내용(상세)</span>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="일정 내용(상세) 입력" rows={2} style={{resize:'vertical', minHeight:'32px', width:'100%'}} />
        </label>
        <button onClick={handleAdd}>추가</button>
      </div>
      <ul className="myschedule-list">
        {filtered.map(s => (
          <li
            key={s.id}
            className={`myschedule-item${s.date === today ? ' today' : ''}`}
            data-color={s.color}
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