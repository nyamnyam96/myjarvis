// Dashboard.jsx

import React from "react";
import Card from "../components/common/Card";
import Checklist from "../components/control/Checklist";
import TimelineList from "../components/feedback/TimelineList";
import Notification from "../components/feedback/Notification";
import ChartCard from "../components/dashboard/ChartCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {

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
    { content: "OO 기업과 계약 완료", time: "2시간 전" },
    { content: "회의록 업로드", time: "어제" },
  ];

    const handleToggle = (id) => {
    setTodoItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );

    // 추후 여기에 API 연동 코드만 넣으면 됨:
    // fetch(`/api/todo/${id}/toggle`, { method: 'PATCH' })
  };

  const backgroundImage = null; // 추후 useState 등으로 동적 설정 예정

  return (
    <>
      {/* 사용자 배경 커스터마이징 카드: 12열 전체 사용 */}
      <div className="xl:col-span-12 mb-6 -mt-[23px]">
        <Card className="relative p-6 rounded-[20px] shadow-[0_20px_27px_0px_rgba(0,0,0,0.05)] bg-white dark:bg-[#21243a] min-h-[220px] overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            {backgroundImage ? (
              <img
                src={backgroundImage}
                alt="사용자 배경"
                className="object-contain max-h-full max-w-full"
              />
            ) : (
              <span className="text-gray-400 dark:text-gray-300 text-center">
                사용자 배경 커스터마이징 영역<br />(파일 업로드 예정)
              </span>
            )}
          </div>
        </Card>
      </div>

      {/* 카드 컨테이너: 12열 그리드 */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* TO-DO 리스트 카드 (좌측 6열) */}
          <div className="xl:col-span-6">
            <Checklist items={todoItems} onToggle={handleToggle} />
          </div>

        {/* 최근 활동 내역 카드 (우측 6열) */}
          <div className="xl:col-span-6">
            <div className="bg-white dark:bg-[#21243a] rounded-[20px] shadow-[0_20px_27px_0px_rgba(0,0,0,0.05)] min-h-[300px] p-6 flex flex-col gap-4">
              <h2 className="section-title text-gray-800 dark:text-gray-200">최근 활동 내역</h2>
              <TimelineList items={timelineItems} />
            </div>
          </div>

        {/* 업무 리마인더 카드 (좌측 6열) */}
        <div className="xl:col-span-6">
          <Card className="min-h-[300px] p-6 rounded-[20px] shadow-[0_20px_27px_0px_rgba(0,0,0,0.05)] bg-white dark:bg-[#21243a]">
            <h2 className="section-title text-gray-800 dark:text-gray-200">업무 리마인더</h2>
            <div className="mt-3 space-y-4">
              <Notification
                icon="⏰"
                title="오늘 18시까지 회의록 업로드"
                time="2시간 남음"
              />
              <Notification
                icon="📝"
                title="계약 검토 마감 D-1"
                time="내일 오전 10시"
              />
            </div>
          </Card>
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
