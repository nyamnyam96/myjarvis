import React, { useState } from 'react';
import './DailyWorkList.css';

function DailyWorkList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: '회의록 정리', done: false, important: true },
    { id: 2, text: '계약 일정 확인', done: false, important: false },
    { id: 3, text: 'To-do 기능 구현', done: true, important: false },
  ]);
  const [input, setInput] = useState('');
  const [hideDone, setHideDone] = useState(false);
  const [filter, setFilter] = useState('all'); // all, important

  const handleAdd = () => {
    if (input.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: input, done: false, important: false },
      ]);
      setInput('');
    }
  };

  const handleToggle = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleImportant = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, important: !t.important } : t));
  };

  const filtered = tasks.filter(t => {
    if (hideDone && t.done) return false;
    if (filter === 'important' && !t.important) return false;
    return true;
  });

  const progress = tasks.length ? Math.round((tasks.filter(t => t.done).length / tasks.length) * 100) : 0;

  return (
    <div className="dailywork-container">
      <h3>오늘의 To-do</h3>
      <div className="dailywork-controls">
        <input
          className="dailywork-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="할 일을 입력하세요"
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
        <button className="dailywork-add-btn" onClick={handleAdd}>추가</button>
        <button className="dailywork-filter-btn" onClick={() => setFilter(filter === 'all' ? 'important' : 'all')}>
          {filter === 'all' ? '⭐ 중요만' : '전체'}
        </button>
        <label className="dailywork-hide-done">
          <input type="checkbox" checked={hideDone} onChange={e => setHideDone(e.target.checked)} /> 완료 숨기기
        </label>
      </div>
      <div className="dailywork-progress">
        <div className="dailywork-progress-bar" style={{ width: `${progress}%` }} />
        <span className="dailywork-progress-text">진행률: {progress}%</span>
      </div>
      <ul className="dailywork-list">
        {filtered.length === 0 && <li className="dailywork-empty">할 일이 없습니다</li>}
        {filtered.map(task => (
          <li key={task.id} className={`dailywork-item${task.done ? ' done' : ''}${task.important ? ' important' : ''}`}>
            <span className="dailywork-check" onClick={() => handleToggle(task.id)}>
              {task.done ? '✔️' : '⬜'}
            </span>
            <span className="dailywork-text">{task.text}</span>
            <button className="dailywork-important-btn" onClick={() => handleImportant(task.id)}>
              {task.important ? '⭐' : '☆'}
            </button>
            <button className="dailywork-delete-btn" onClick={() => handleDelete(task.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DailyWorkList;