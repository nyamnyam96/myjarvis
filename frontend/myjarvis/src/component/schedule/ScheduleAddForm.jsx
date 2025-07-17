import React from 'react';

function ScheduleAddForm({
  addType,
  setAddType,
  addTitle,
  setAddTitle,
  addDate,
  setAddDate,
  addDesc,
  setAddDesc,
  addStatus,
  setAddStatus,
  addColor,
  setAddColor,
  handleAddSchedule
}) {
  return (
    <div className="schedulemain-addform">
      <h3>일정 등록</h3>
      <label>
        유형
        <select value={addType} onChange={e => setAddType(e.target.value)}>
          <option value="contract">계약 일정</option>
          <option value="personal">개인 일정</option>
        </select>
      </label>
      <label>
        제목
        <input value={addTitle} onChange={e => setAddTitle(e.target.value)} />
      </label>
      <label>
        날짜
        <input type="date" value={addDate} onChange={e => setAddDate(e.target.value)} />
      </label>
      <label>
        일정 내용
        <textarea className="schedulemain-detail-textarea" value={addDesc} onChange={e => setAddDesc(e.target.value)} placeholder="일정 내용(상세) 입력" rows={2} />
      </label>
      <label>
        상태
        <select value={addStatus} onChange={e => setAddStatus(e.target.value)}>
          <option value="계획">계획</option>
          <option value="진행중">진행중</option>
          <option value="완료">완료</option>
        </select>
      </label>
      <label>
        색상
        <input type="color" value={addColor} onChange={e => setAddColor(e.target.value)} />
      </label>
      <button onClick={handleAddSchedule}>등록</button>
    </div>
  );
}

export default ScheduleAddForm;
