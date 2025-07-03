import React from "react";
import Sidebar from "../components/layout/Sidebar";
import Card from "../components/common/Card";
import Checklist from "../components/control/Checklist";
import TimelineList from "../components/feedback/TimelineList";
import Notification from "../components/feedback/Notification";

export default function Dashboard() {
  const todoItems = [
    { label: "계약서 작성", checked: true },
    { label: "회의 일정 잡기", checked: false },
    { label: "청구서 발행", checked: false },
  ];

  const timelineItems = [
    { content: "OO 기업과 계약 완료", time: "2시간 전" },
    { content: "회의록 업로드", time: "어제" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F4F7FE]">
      {/* 좌측 사이드바 */}
      <Sidebar />

      {/* 우측 메인 콘텐츠 */}
      <main className="flex-1 px-6 py-8 overflow-y-auto max-w-screen-2xl w-full mx-auto">
        {/* 상단 제목 (Horizon 감성 반영) */}
        <div className="mb-8">
          <h2 className="text-[22px] font-bold text-gray-700 tracking-tight">사용자 커스터마이징 배경</h2>
        </div>

        {/* 12열 기반 카드 레이아웃 */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* TO-DO 리스트: 좌측 8열 */}
          <div className="xl:col-span-8">
            <Card className="p-6 rounded-[20px] shadow-[0_20px_27px_0px_rgba(0,0,0,0.05)] bg-white">
              <h2 className="section-title">TO-DO LIST</h2>
              <Checklist items={todoItems} />
            </Card>
          </div>

          {/* 타임라인: 우측 4열 */}
          <div className="xl:col-span-4">
            <Card className="p-6 rounded-[20px] shadow-[0_20px_27px_0px_rgba(0,0,0,0.05)] bg-white">
              <h2 className="section-title">최근 활동 내역</h2>
              <TimelineList items={timelineItems} />
            </Card>
          </div>

          {/* 업무 리마인더: 좌측 6열 */}
          <div className="xl:col-span-6">
            <Card className="p-6 rounded-[20px] shadow-[0_20px_27px_0px_rgba(0,0,0,0.05)] bg-white">
              <h2 className="section-title">업무 리마인더</h2>
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

          {/* 향후 영역 확장: 우측 6열 */}
          <div className="xl:col-span-6">
            <Card className="p-6 rounded-[20px] shadow-[0_20px_27px_0px_rgba(0,0,0,0.05)] bg-white flex items-center justify-center text-gray-400 min-h-[200px]">
              통계 차트 또는 최근 일정 등 추가 영역
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
