import React, { useState } from "react";
import "./TodoListInsert.css";

export default function TodoListInsert({ onClose, onAdd }) {
  const [type, setType] = useState("task");
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState(""); // 마감 기한
  const [notify, setNotify] = useState(false);  // 알림 여부

  const handleSubmit = () => {
    if (!content.trim()) return;

    const time = deadline || new Date().toISOString().slice(0, 16).replace("T", " ");
    onAdd({ content, type, time, notify });
    onClose();
  };

  return (
    <div className="todo-insert-backdrop">
      <div className="todo-insert-container">
        <h2 className="todo-insert-title">To-Do 항목 추가</h2>
    <br />
        <label className="todo-insert-label">
          카테고리
          <select value={type} onChange={(e) => setType(e.target.value)} className="todo-insert-select">
            <option value="contract">계약</option>
            <option value="schedule">일정</option>
            <option value="memo">메모</option>
            <option value="task">작업</option>
            <option value="invoice">청구</option>
            <option value="report">보고</option>
            <option value="alert">알림</option>
            <option value="file">파일</option>
          </select>
        </label>

        <label className="todo-insert-label">
          내용
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="할 일 내용을 입력하세요"
            className="todo-insert-textarea"
          />
        </label>

        <label className="todo-insert-label">
          마감 기한
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="todo-insert-input"
          />
        </label>
    <br />
        <label className="todo-insert-checkbox">
          <input
            type="checkbox"
            checked={notify}
            onChange={(e) => setNotify(e.target.checked)}
          />
          &nbsp; 알림 받기
        </label>

        <div className="todo-insert-buttons">
          <button className="btn-cancel" onClick={onClose}>취소</button>
          <button className="btn-confirm" onClick={handleSubmit}>추가</button>
        </div>
      </div>
    </div>
  );
}
