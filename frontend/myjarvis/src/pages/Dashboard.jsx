import React from "react";
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

  const backgroundImage = null; // 추후 useState 등으로 동적 설정 예정

  return (
    <>
      {/* 사용자 배경 커스터마이징 카드: 12열 전체 사용 */}
      <div className="xl:col-span-12 mb-6 -mt-[23px]">
        <Card className="relative p-6 rounded-[20px] shadow-[0_20px_27px_0px_rgba(0,0,0,0.05)] bg-white min-h-[220px] overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            {backgroundImage ? (
              <img
                src={backgroundImage}
                alt="사용자 배경"
                className="object-contain max-h-full max-w-full"
              />
            ) : (
              <span className="text-gray-400 text-center">
                사용자 배경 커스터마이징 영역<br />(파일 업로드 예정)
              </span>
            )}
          </div>
        </Card>
      </div>
        {/* 카드 컨테이너: 12열 그리드 */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* TO-DO 리스트 카드 (좌측 8열) */}
          <div className="xl:col-span-6">
            <Card className="min-h-[300px] p-6 rounded-[20px] shadow-[0_20px_27px_0px_rgba(0,0,0,0.05)] bg-white">
              <h2 className="section-title">TO-DO LIST</h2>
              <Checklist items={todoItems} />
            </Card>
          </div>

          {/* 최근 활동 내역 카드 (우측 4열) */}
          <div className="xl:col-span-6">
            <Card className="min-h-[300px] p-6 rounded-[20px] shadow-[0_20px_27px_0px_rgba(0,0,0,0.05)] bg-white">
              <h2 className="section-title">최근 활동 내역</h2>
              <TimelineList items={timelineItems} />
            </Card>
          </div>

          {/* 업무 리마인더 카드 (좌측 6열) */}
          <div className="xl:col-span-6">
            <Card className="min-h-[300px] p-6 rounded-[20px] shadow-[0_20px_27px_0px_rgba(0,0,0,0.05)] bg-white">
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

          {/* 통계/일정 추가 카드 (우측 6열) */}
          <div className="xl:col-span-6">
            <Card className="min-h-[300px] p-6 rounded-[20px] shadow-[0_20px_27px_0px_rgba(0,0,0,0.05)] bg-white flex items-center justify-center text-gray-400">
              통계 차트 또는 최근 일정 등 추가 영역
            </Card>
          </div>
        </div>
</>
  );
}
