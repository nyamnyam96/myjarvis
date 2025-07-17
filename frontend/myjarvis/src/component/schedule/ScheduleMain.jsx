import React, { useState, useMemo } from 'react';
import ScheduleAllView from './ScheduleAllView';
import ScheduleAddForm from './ScheduleAddForm';
import DailyWorkList from './DailyWorkList';
import WorkRemind from './WorkRemind';
import './ScheduleMain.css';

// 샘플 계약 데이터(자동 생성) - 실제 서비스에서는 불필요, 백엔드 연동 시 제거 가능
const initialContracts = [];


function ScheduleMain() {
  // 상단 탭: all(전체 일정), add(일정 등록), todo(To-do)
  const [mainTab, setMainTab] = useState('all');
  // 월/주/일 보기 (전체일정 진입 시 항상 월간으로)
  const [view, setView] = useState('month');
  // 달력 월 상태 (기본: 오늘)
  const today = useMemo(() => new Date(), []);
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth()); // 0~11
  // 계약/개인 일정 데이터
  const [contracts, setContracts] = useState(initialContracts);
  const [personal, setPersonal] = useState([]);
  // 일정 등록 폼 상태
  const [addType, setAddType] = useState('contract');
  const [addTitle, setAddTitle] = useState('');
  const [addDate, setAddDate] = useState('');
  const [addStatus, setAddStatus] = useState('계획');
  const [addColor, setAddColor] = useState('#4caf50');
  const [addDesc, setAddDesc] = useState("");

  // 상태별 진행률 자동 설정
  const statusToProgress = (status) => {
    if (status === '계획') return 0;
    if (status === '진행중') return 50;
    if (status === '완료') return 100;
    return 0;
  };

  // 일정 등록 핸들러
  const handleAddSchedule = async () => {
    if (!addTitle || !addDate) return;
    const newSchedule = {
      title: addTitle,
      date: addDate,
      color: addColor,
      status: addStatus,
      progress: statusToProgress(addStatus),
      type: addType,
      done: addStatus === '완료',
      start: '09:00',
      detail: addDesc,
    };
    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSchedule)
      });
      if (!response.ok) throw new Error('서버 오류');
      const saved = await response.json();
      if (addType === 'contract') {
        setContracts(prev => [
          ...prev,
          {
            id: saved.id || Date.now(),
            name: saved.title,
            status: saved.status,
            progress: saved.progress,
            schedules: [
              { id: saved.id || Date.now(), title: saved.title, date: saved.date, done: saved.done, detail: saved.detail }
            ]
          }
        ]);
      } else {
        setPersonal(prev => [
          { ...saved, id: saved.id || Date.now() },
          ...prev
        ]);
      }
      setAddTitle('');
      setAddDate('');
      setAddStatus('계획');
      setAddColor('#4caf50');
      setAddDesc('');
      setMainTab('all');
    } catch {
      console.error('오류 발생');
    }
  };

  // 통합 일정 리스트 생성 (계약+개인)
  const allSchedules = [
    ...contracts.map(c => ({
      id: c.id,
      title: c.name,
      date: c.schedules && c.schedules[0]?.date ? c.schedules[0].date : '',
      color: '#ff9800',
      status: c.status,
      progress: c.progress,
      type: 'contract',
      detail: '',
    })),
    ...personal
  ];
  // 정렬: 진행률 내림차순, 100%는 맨 아래
  const sortedSchedules = [
    ...allSchedules.filter(s => s.progress < 100).sort((a, b) => b.progress - a.progress),
    ...allSchedules.filter(s => s.progress === 100)
  ];

  // 상세보기/수정 상태
  const [selected, setSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editStatus, setEditStatus] = useState('');
  const [editDetail, setEditDetail] = useState('');

  // 전체일정 진입 시 월간으로 초기화 + 달력 월도 오늘로
  React.useEffect(() => {
    if (mainTab === 'all') {
      setView('month');
      setCalendarYear(today.getFullYear());
      setCalendarMonth(today.getMonth());
    }
  }, [mainTab, today]);

  // 달력 렌더링 (간단 커스텀)
  function renderCalendar() {
    // 현재 달력 월/년
    const year = calendarYear;
    const month = calendarMonth;
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    // 일정이 있는 날짜만 추출
    const scheduleByDate = {};
    sortedSchedules.forEach(s => {
      if (!s.date) return;
      const d = new Date(s.date);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        if (!scheduleByDate[day]) scheduleByDate[day] = [];
        scheduleByDate[day].push(s);
      }
    });
    // 달력 그리드
    const weeks = [];
    let week = [];
    // 1일의 요일(0:일~6:토)
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    // 첫 주 빈칸
    for (let i = 0; i < firstDayOfWeek; i++) week.push(<td key={`empty-start-${i}`} />);
    for (let i = 1; i <= daysInMonth; i++) {
      const daySchedules = scheduleByDate[i] || [];
      week.push(
        <td key={i} className={daySchedules.length ? 'has-schedule' : ''}>
          <div className={`calendar-day${selected && daySchedules.some(s => s.id === selected.id) ? ' selected' : ''}`}
            onClick={() => daySchedules.length && setSelected(daySchedules[0])}
          >
            {i}
            {daySchedules.length > 0 && <span className="calendar-dot" />}
          </div>
        </td>
      );
      // 주 단위로 끊기
      const date = new Date(year, month, i);
      if (date.getDay() === 6 || i === daysInMonth) {
        while (week.length < 7) week.push(<td key={`empty-${week.length}`} />);
        weeks.push(<tr key={i}>{week}</tr>);
        week = [];
      }
    }
    return (
      <>
        <div className="calendar-header-row">
          <button className="calendar-nav-btn" onClick={() => {
            if (month === 0) {
              setCalendarYear(year - 1); setCalendarMonth(11);
            } else {
              setCalendarMonth(month - 1);
            }
          }}>{'<'}</button>
          <span className="calendar-title">{year}년 {month + 1}월</span>
          <button className="calendar-nav-btn" onClick={() => {
            if (month === 11) {
              setCalendarYear(year + 1); setCalendarMonth(0);
            } else {
              setCalendarMonth(month + 1);
            }
          }}>{'>'}</button>
        </div>
        <table className="calendar-table">
          <thead>
            <tr>
              <th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>
            </tr>
          </thead>
          <tbody>{weeks}</tbody>
        </table>
      </>
    );
  }

  // 상세/수정 저장
  const handleEditSave = () => {
    if (!selected) return;
    if (selected.type === 'contract') {
      setContracts(prev => prev.map(c => c.id === selected.id ? { ...c, status: editStatus, progress: statusToProgress(editStatus) } : c));
    } else {
      setPersonal(prev => prev.map(p => p.id === selected.id ? { ...p, status: editStatus, detail: editDetail, progress: statusToProgress(editStatus) } : p));
    }
    setEditMode(false);
    setSelected(null);
  };

  // Ensure proper rendering of tabs
  React.useEffect(() => {
    if (mainTab === 'all') {
      setView('month');
      setCalendarYear(today.getFullYear());
      setCalendarMonth(today.getMonth());
    }
  }, [mainTab, today]);

  return (
    <div className="schedulemain-container">
      <h2>일정 통합 관리</h2>
      <div className="schedulemain-tabs">
        <button onClick={() => setMainTab('all')} className={mainTab === 'all' ? 'active' : ''}>전체 일정</button>
        <button onClick={() => setMainTab('add')} className={mainTab === 'add' ? 'active' : ''}>일정 등록</button>
        <button onClick={() => setMainTab('todo')} className={mainTab === 'todo' ? 'active' : ''}>To-do</button>
        <button onClick={() => setMainTab('remind')} className={mainTab === 'remind' ? 'active' : ''}>리마인드</button>
      </div>
      <div className="schedulemain-content">
        {mainTab === 'all' && (
          <ScheduleAllView
            view={view}
            setView={setView}
            sortedSchedules={sortedSchedules}
            selected={selected}
            setSelected={setSelected}
            renderCalendar={renderCalendar}
            editMode={editMode}
            setEditMode={setEditMode}
            editStatus={editStatus}
            setEditStatus={setEditStatus}
            editDetail={editDetail}
            setEditDetail={setEditDetail}
            handleEditSave={handleEditSave}
          />
        )}
        {mainTab === 'add' && (
          <ScheduleAddForm
            addType={addType}
            setAddType={setAddType}
            addTitle={addTitle}
            setAddTitle={setAddTitle}
            addDate={addDate}
            setAddDate={setAddDate}
            addDesc={addDesc}
            setAddDesc={setAddDesc}
            addStatus={addStatus}
            setAddStatus={setAddStatus}
            addColor={addColor}
            setAddColor={setAddColor}
            handleAddSchedule={handleAddSchedule}
          />
        )}
        {mainTab === 'todo' && <DailyWorkList />}
        {mainTab === 'remind' && <WorkRemind tab={view} />}
      </div>
    </div>
  );
}

export default ScheduleMain;