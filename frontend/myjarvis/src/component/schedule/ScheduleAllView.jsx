import React from 'react';

function ScheduleAllView({
  view,
  setView,
  sortedSchedules,
  selected,
  setSelected,
  renderCalendar,
  editMode,
  setEditMode,
  editStatus,
  setEditStatus,
  editDetail,
  setEditDetail,
  handleEditSave,
  mainTab,
  setMainTab
}) {
  return (
    <>
      {/* 상단 통합 탭 버튼 */}
      <div className="schedulemain-main-tabs">
        <button onClick={() => setMainTab('all')} className={mainTab === 'all' ? 'active' : ''}>전체일정보기</button>
        <button onClick={() => setMainTab('add')} className={mainTab === 'add' ? 'active' : ''}>일정등록</button>
        <button onClick={() => setMainTab('remind')} className={mainTab === 'remind' ? 'active' : ''}>리마인드</button>
        <button onClick={() => setMainTab('todo')} className={mainTab === 'todo' ? 'active' : ''}>데일리작업스케쥴</button>
      </div>
      <div className="schedulemain-view-btns">
        <button onClick={() => setView('month')} className={view === 'month' ? 'active' : ''}>월간</button>
        <button onClick={() => setView('week')} className={view === 'week' ? 'active' : ''}>주간</button>
        <button onClick={() => setView('day')} className={view === 'day' ? 'active' : ''}>일간</button>
      </div>
      {view === 'month' ? (
        <div className="schedulemain-calendar-wrap">
          {renderCalendar()}
        </div>
      ) : (
        <ul className="schedulemain-list">
          {sortedSchedules.length === 0 && (
            <li className="schedulemain-empty">일정이 없습니다.</li>
          )}
          {sortedSchedules.map(s => (
            <li
              key={s.id}
              className={`schedulemain-item type-${s.type}${selected && selected.id === s.id ? ' selected' : ''}`}
              data-color={s.color}
              onClick={() => setSelected(s)}
            >
              <span className="schedulemain-title">{s.title}</span>
              <span className="schedulemain-date">{s.date}</span>
              <span className="schedulemain-status">{s.status}</span>
              <span className="schedulemain-progress">{s.progress}%</span>
            </li>
          ))}
        </ul>
      )}
      {selected && (
        <div className="schedulemain-detail-popup">
          <h4>{selected.title} 상세</h4>
          <p>날짜: {selected.date}</p>
          {editMode ? (
            <>
              <label>
                상태
                <select value={editStatus} onChange={e => setEditStatus(e.target.value)}>
                  <option value="계획">계획</option>
                  <option value="진행중">진행중</option>
                  <option value="완료">완료</option>
                </select>
              </label>
              <label>
                내용
                <input value={editDetail} onChange={e => setEditDetail(e.target.value)} />
              </label>
              <button onClick={handleEditSave}>저장</button>
              <button onClick={() => setEditMode(false)}>취소</button>
            </>
          ) : (
            <>
              <p>상태: {selected.status}</p>
              <p>진행률: {selected.progress}%</p>
              <p>내용: {selected.detail || '-'}</p>
              <button onClick={() => {
                setEditMode(true);
                setEditStatus(selected.status);
                setEditDetail(selected.detail || '');
              }}>수정</button>
            </>
          )}
          <button onClick={() => setSelected(null)}>닫기</button>
        </div>
      )}
    </>
  );
}

export default ScheduleAllView;
