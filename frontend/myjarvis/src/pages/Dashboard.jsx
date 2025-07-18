// Dashboard.jsx

import defaultBackground from "../assets/sample0.jpg";
import React, { useState } from "react";
import Card from "../components/common/Card";
import Checklist from "../components/control/Checklist";
import TimelineList from "../components/feedback/TimelineList";
import Notification from "../components/feedback/Notification";
import ChartCard from "../components/dashboard/ChartCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {

  const [userBackground, setUserBackground] = useState(defaultBackground);
  const reminderItems = [
  {
    icon: "⏰",
    title: "오늘 18시까지 회의록 업로드",
    time: "2시간 남음",
  },
  {
    icon: "📝",
    title: "계약 검토 마감 D-1",
    time: "내일 오전 10시",
  },
  {
  icon: "📦",
  title: "세금계산서 마감 3일 전",
  time: "D-3"
  },
  {
    icon: "📌",
    title: "이번 주 금요일까지 거래처 미팅 준비",
    time: "D-2",
  },
  {
    icon: "🗂️",
    title: "월말 보고서 초안 오늘 중 작성",
    time: "마감 임박",
  },
  ];

  const todoItems = [
  { id: 1, label: "전자계약 확인", deadline: "2025-07-16" },
  { id: 2, label: "계약서 작성", deadline: "2025-07-17" },
  { id: 3, label: "회의 일정 조율", deadline: "2025-07-18" },
  { id: 4, label: "자료 제출 마감", deadline: "2025-07-19" },
  { id: 5, label: "청구서 발행", deadline: "2025-07-20" },
  { id: 6, label: "거래처 미팅 일정", deadline: "2025-07-22" },
  { id: 7, label: "발주 확정 체크", deadline: "2025-07-25" },
  { id: 8, label: "결제 일정 확인", deadline: "2025-07-26" },
];

    const timelineItems = [
    {
      type: "contract",
      content: (
        <>
          <span className="text-blue-600 dark:text-blue-400 font-semibold">네이버</span>과 계약이 체결되었습니다.
        </>
      ),
      time: "2025-07-17 09:12",
    },
    {
      type: "schedule",
      content: (
        <>
          <span className="text-blue-600 dark:text-blue-400 font-semibold">2025-07-20</span>에{" "}
          <span className="text-blue-600 dark:text-blue-400 font-semibold">서비스 런칭</span> 일정이 등록되었습니다.
        </>
      ),
      time: "2025-07-17 10:30",
    },
    {
      type: "memo",
      content: (
        <>
          <span className="text-blue-600 dark:text-blue-400 font-semibold">업무 공유사항</span> 메모가 작성되었습니다.
        </>
      ),
      time: "2025-07-17 11:05",
    },
    {
      type: "task",
      content: (
        <>
          <span className="text-blue-600 dark:text-blue-400 font-semibold">계약서 검토</span> 작업이 완료되었습니다.
        </>
      ),
      time: "2025-07-17 11:30",
    },
    {
      type: "invoice",
      content: (
        <>
          <span className="text-blue-600 dark:text-blue-400 font-semibold">6월 유지보수</span>에 대한 청구서가 발행되었습니다.
        </>
      ),
      time: "2025-07-17 13:10",
    },
    {
      type: "report",
      content: (
        <>
          <span className="text-blue-600 dark:text-blue-400 font-semibold">계약 미이행</span>에 대한 신고가 접수되었습니다.
        </>
      ),
      time: "2025-07-17 14:00",
    },
    {
      type: "alert",
      content: (
        <>
          <span className="text-blue-600 dark:text-blue-400 font-semibold">계약 마감 임박</span> 알림이 도착했습니다.
        </>
      ),
      time: "2025-07-17 15:00",
    },
    {
      type: "file",
      content: (
        <>
          <span className="text-blue-600 dark:text-blue-400 font-semibold">세금계산서_2025_07.pdf</span> 파일이 업로드되었습니다.
        </>
      ),
      time: "2025-07-17 15:30",
    },
  ];

    const handleToggle = (id) => {
    setTodoItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );

  };

  const backgroundImage = null; // 추후 useState 등으로 동적 설정 예정

  return (
    <>
      {/* 사용자 배경 커스터마이징 카드: 이미지로 꽉 채움 */}
      <div className="xl:col-span-12 mb-6 -mt-[23px]">
        <div className="w-full h-[230px] overflow-hidden">
          {userBackground ? (
            <img
              src={userBackground}
              alt="사용자 배경"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-300 text-sm">
              사용자 배경 커스터마이징 영역<br />(파일 업로드 예정)
            </div>
          )}
        </div>
      </div>

      {/* 카드 컨테이너: 12열 그리드 */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* TO-DO 리스트 카드 (좌측 6열) */}
          <div className="xl:col-span-6">
            <Checklist items={todoItems} onToggle={handleToggle} />
          </div>

        {/* 최근 활동 내역 카드 (우측 6열) */}
          <div className="xl:col-span-6">
              <TimelineList items={timelineItems} />
          </div>

        {/* 업무 리마인더 카드 (좌측 6열) */}
          <div className="xl:col-span-6">
            <Notification items={reminderItems} />
          </div>

        {/* 통계/일정 추가 카드 (우측 6열) */}
        <div className="xl:col-span-6">
          <ChartCard
            title="계약 건수 비교"
            barData={[
              { name: "지난달", 계약: 13 },
              { name: "이번달", 계약: 24 }
            ]}
            pieData={[
              { name: "초안", value: 3 },
              { name: "진행", value: 5 },
              { name: "완료", value: 4 },
              { name: "취소", value: 1 }
            ]}
          />
        </div>
      </div>
    </>
  );
}
