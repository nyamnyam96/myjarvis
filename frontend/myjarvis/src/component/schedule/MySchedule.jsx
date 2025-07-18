import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./MySchedule.css";
import ko from "date-fns/locale/ko";
import MyScheduleModal from "./MyScheduleModal";
import TodoListInsert from "./TodoListInsert";
import "./TodoListInsert.css";


//  To-Do용 타입별 아이콘 매핑
const typeIcon = {
  contract: "📃",
  schedule: "⏰",
  memo: "🗒️",
  task: "✅",
  invoice: "💳",
  report: "🚨",
  alert: "⚠️",
  file: "📁",
};

//  To-Do용 타입별 배지 색상 클래스
const typeBadgeClass = {
  contract: "bg-blue-100 text-blue-600",
  schedule: "bg-green-100 text-green-600",
  memo: "bg-yellow-100 text-yellow-700",
  task: "bg-purple-100 text-purple-600",
  invoice: "bg-red-100 text-red-600",
  report: "bg-orange-100 text-orange-600",
  alert: "bg-rose-100 text-rose-600",
  file: "bg-gray-100 text-gray-600",
};

// 캘린더용 지역 설정
const locales = {
  "ko-KR": ko,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// 목업 일정 데이터
const events = [
  {
    id: 1,
    title: "계약서 마감",
    start: new Date(2025, 6, 18),
    end: new Date(2025, 6, 18),
    type: "contract",
  },
  {
    id: 2,
    title: "디자인 미팅",
    start: new Date(2025, 6, 20),
    end: new Date(2025, 6, 20),
    type: "personal",
  },
  {
    id: 3,
    title: "개발 QA 체크",
    start: new Date(2025, 6, 22),
    end: new Date(2025, 6, 22),
    type: "personal",
  },
  {
    id: 4,
    title: "런칭 이벤트 준비",
    start: new Date(2025, 6, 25),
    end: new Date(2025, 6, 25),
    type: "event", // 벚꽃색으로 지정
  },
];

export default function MySchedule() {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([
  {
    content: "계약서 검토 요청 보내기",
    type: "contract",
    time: "2025-07-17 14:30",
  },
  {
    content: "회의 일정 캘린더 반영",
    type: "schedule",
    time: "2025-07-18 10:00",
  },
  {
    content: "작업 마감 알림 설정",
    type: "alert",
    time: "2025-07-19 09:00",
  },
]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const tabs = ["전체 일정 보기", "일정 모아보기"];
  const [activeTab, setActiveTab] = useState("전체 일정 보기");
  const [filterType, setFilterType] = useState("전체");

  //  간단한 To-Do 상태 추가
  const [todoInput, setTodoInput] = useState("");
  const filteredEvents = events.filter((event) => {
    if (filterType === "전체") return true;
    return event.type === filterType.toLowerCase();
  });

  const renderTabContent = () => {
    if (activeTab !== "전체 일정 보기") {
      return (
        //  일정 필터 + To-Do 영역을 2단으로 나눈 레이아웃
        <div className="tab-content two-panel">
          {/* 좌측: 일정 필터링 영역 */}
          <div className="todo-panel-left bg-white dark:bg-[#1e2133] p-6 rounded-lg shadow-md w-full">
            <div className="filter-bar">
              <label htmlFor="typeFilter">일정 유형:</label>
              <select
                id="typeFilter"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="filter-select"
              >
                <option>전체</option>
                <option>계약</option>
                <option>작업</option>
                <option>리마인더</option>
              </select>
            </div>
            <div className="schedule-list">
              {filteredEvents.length === 0 ? (
                <div className="empty-message">해당 일정이 없습니다.</div>
              ) : (
                filteredEvents.map((event) => (
                  <div key={event.id} className={`schedule-card ${event.type}`}>
                    <strong>{event.title}</strong>
                    <span>{format(event.start, "yyyy-MM-dd")}</span>
                  </div>
                ))
              )}
            </div>
          </div>
            {/*  우측: To-Do 작성 영역 */}
            <div className="todo-panel-right bg-white dark:bg-[#1e2133] p-6 rounded-lg shadow-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">To-Do List</h2>
                <button
                  onClick={() => setShowModal(true)}
                  className="todo-add-btn bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-4 py-2 rounded-md hover:opacity-90"
                >
                  추가
                </button>
              </div>
              {/* To-Do 리스트 */}
                <ul className="todo-list flex flex-col gap-3">
                  {todos.map((todo, idx) => {
                    const icon = typeIcon[todo.type] || "📌";
                    const badgeClass = typeBadgeClass[todo.type] || "bg-gray-200 text-gray-600";
                    return (
                      <li
                        key={idx}
                        className="todo-card flex items-start gap-3 px-4 py-3 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 text-sm dark:bg-[#2a2e47] dark:text-gray-100 dark:border-gray-600"
                      >
                        {/* 아이콘 */}
                        <div className="text-xl">{icon}</div>
                        {/* 내용 본문 */}
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            {/* 뱃지 */}
                            <span className={`text-xs px-2 py-0.5 rounded ${badgeClass}`}>
                              {todo.type?.toUpperCase()}
                            </span>
                            {/* 할 일 내용 */}
                            <span className="font-medium">{todo.content}</span>
                          </div>
                          {/* 시간 */}
                          <div className="text-xs text-gray-500 dark:text-gray-400">{todo.time}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
            </div>
        </div>
      );
    }

    return (
      <div className="tab-content schedule-layout">
        {/* 좌측 캘린더 */}
        <div className="calendar-container">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "calc(100vh - 340px)" }}
            eventPropGetter={(event) => {
              let bg;
              if (event.type === "contract") bg = "#6366f1"; // 보라색
              else if (event.type === "event") bg = "#f472b6"; // 벚꽃색
              else bg = "#10b981"; // 초록색
              return {
                style: {
                  backgroundColor: bg,
                  color: "white",
                  borderRadius: "6px",
                  padding: "4px",
                },
              };
            }}
          />
        </div>

        {/* 우측 일정 카드 */}
        <div className="schedule-list">
          <div className="schedule-list-header">
            <h2 className="schedule-list-title">다가오는 일정</h2>
            <button className="register-btn" onClick={() => setIsModalOpen(true)}>
              + 새로운 일정 등록하기
            </button>
          </div>
          {events.map((ev) => (
            <div key={ev.id} className={`schedule-card ${ev.type}`}>
              <strong>{ev.title}</strong>
              <span>{format(ev.start, "yyyy-MM-dd")}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    
    <div className="schedule-dashboard content-wrap">
      <h1 className="content-title">일정 관리</h1>

      <div style={{ display: "flex", justifyContent: "flex-start", gap: "12px" }}>
        {tabs.map((label) => (
          <button
            key={label}
            className={`schedule-btn ${activeTab === label ? "selected" : "unselected"}`}
            onClick={() => setActiveTab(label)}
          >
            {label}
          </button>
        ))}
      </div>
      {showModal && (
        <TodoListInsert
          onClose={() => setShowModal(false)}
          onAdd={(newTodo) => setTodos([...todos, newTodo])}
        />
      )}
      <div className="tab-area">{renderTabContent()}</div>
      <MyScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
    
  );
}
