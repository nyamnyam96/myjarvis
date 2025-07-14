import { useState } from "react";
import Card from "../../components/common/Card";
import "./Stats.css";

function Stats() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="stats-wrapper">
      {/* 상단 탭 버튼 */}
      <div className="stats-tabs">
        <button
          className={`stats-tab-btn ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          전체 통계 분석
        </button>
        <button
          className={`stats-tab-btn ${activeTab === "ai" ? "active" : ""}`}
          onClick={() => setActiveTab("ai")}
        >
          AI 통계 인사이트
        </button>
      </div>

      {/* 탭별 콘텐츠 */}
      <div className="stats-container">
        {activeTab === "all" && (
          <div className="stats-grid">
            <Card className="stats-card">이번 달 계약</Card>
            <Card className="stats-card">고객사 수</Card>
            <Card className="stats-card">진행 중 프로젝트</Card>
            <Card className="stats-card">총 청구 금액</Card>
          </div>
        )}

        {activeTab === "ai" && (
          <div className="stats-grid">
            <Card className="stats-card">업무 인사이트</Card>
            <Card className="stats-card">재무 인사이트</Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stats;
