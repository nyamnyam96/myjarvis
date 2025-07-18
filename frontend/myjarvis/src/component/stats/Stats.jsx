import { useState } from "react";
import Card from "../../components/common/Card";
import "./Stats.css";

function Stats() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="stats-content-wrap stats-wrapper">
      {/* 탭 버튼 */}
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

      <div className="stats-container">
        {/* 전체 통계 */}
        {activeTab === "all" && (
          <div className="stats-grid">
            {/* 이번 달 계약 */}
            <Card className="stats-card-box animate-fadeUp">
              <h3 className="stats-card-title">📄 이번 달 계약</h3>
              <div className="stats-metrics-grid">
                <div>
                  <p className="stats-card-value text-pink-300">5건</p>
                  <p className="stats-card-desc">체결 완료 기준</p>
                </div>
                <div>
                  <p className="stats-card-value text-sky-300">₩1.05M</p>
                  <p className="stats-card-desc">평균 계약 단가</p>
                </div>
                <div>
                  <p className="stats-card-value text-emerald-300">100%</p>
                  <p className="stats-card-desc">전자계약 비율</p>
                </div>
                <div>
                  <p className="stats-card-value text-yellow-300">0건</p>
                  <p className="stats-card-desc">계약 취소 수</p>
                </div>
              </div>
            </Card>

            {/* 고객사 수 */}
            <Card className="stats-card-box animate-fadeUp">
              <h3 className="stats-card-title">🏢 고객사 수</h3>
              <div className="stats-metrics-grid">
                <div>
                  <p className="stats-card-value text-pink-300">12곳</p>
                  <p className="stats-card-desc">누적 고객사</p>
                </div>
                <div>
                  <p className="stats-card-value text-sky-300">2곳</p>
                  <p className="stats-card-desc">신규 고객사</p>
                </div>
                <div>
                  <p className="stats-card-value text-emerald-300">91.7%</p>
                  <p className="stats-card-desc">거래 지속률</p>
                </div>
                <div>
                  <p className="stats-card-value text-yellow-300">75%</p>
                  <p className="stats-card-desc">기업 고객 비중</p>
                </div>
              </div>
            </Card>

            {/* 프로젝트 현황 */}
            <Card className="stats-card-box animate-fadeUp">
              <h3 className="stats-card-title">🛠️ 프로젝트 현황</h3>
              <div className="stats-metrics-grid">
                <div>
                  <p className="stats-card-value text-pink-300">3건</p>
                  <p className="stats-card-desc">진행 중</p>
                </div>
                <div>
                  <p className="stats-card-value text-sky-300">17일</p>
                  <p className="stats-card-desc">평균 기간</p>
                </div>
                <div>
                  <p className="stats-card-value text-emerald-300">▲ 87%</p>
                  <p className="stats-card-desc">완료 예상률</p>
                </div>
                <div>
                  <p className="stats-card-value text-yellow-300">100%</p>
                  <p className="stats-card-desc">스케줄 연동</p>
                </div>
              </div>
            </Card>

            {/* 총 청구 금액 */}
            <Card className="stats-card-box animate-fadeUp">
              <h3 className="stats-card-title">💰 총 청구 금액</h3>
              <div className="stats-metrics-grid">
                <div>
                  <p className="stats-card-value text-pink-300">₩5.25M</p>
                  <p className="stats-card-desc">올해 누적</p>
                </div>
                <div>
                  <p className="stats-card-value text-sky-300">₩1.3M</p>
                  <p className="stats-card-desc">월 평균</p>
                </div>
                <div>
                  <p className="stats-card-value text-yellow-300">0%</p>
                  <p className="stats-card-desc">미수금</p>
                </div>
                <div>
                  <p className="stats-card-value text-emerald-300">▲ 100%</p>
                  <p className="stats-card-desc">자동 발행</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* AI 인사이트 */}
          {activeTab === "ai" && (
            <div className="stats-grid">
              {/* 업무 인사이트 */}
              <Card className="stats-card-box animate-fadeUp">
                <h3 className="stats-card-title text-lg md:text-xl font-bold mb-4">🧠 업무 인사이트</h3>

                {/* 인사이트 항목 */}
                <div className="stats-ai-block">
                  <p className="stats-card-value">회의</p>
                  <p className="stats-card-desc">
                    이번 주 회의는 <span className="ai-point">수요일</span>에 집중되어 있으며, 등록 비율은 전체의 <span className="ai-point">42%</span>입니다.
                  </p>
                </div>
                <div className="stats-ai-block">
                  <p className="stats-card-value">계약</p>
                  <p className="stats-card-desc">
                    최근 계약은 <span className="ai-point">이메일 발송 후</span> 평균 <span className="ai-point">24시간</span> 내 체결되었습니다.
                  </p>
                </div>
                <div className="stats-ai-block">
                  <p className="stats-card-value">메모</p>
                  <p className="stats-card-desc">
                    이번 달 메모 작성이 <span className="ai-point">17%</span> 감소하였습니다.
                  </p>
                </div>
                <div className="stats-ai-block">
                  <p className="stats-card-value">일정</p>
                  <p className="stats-card-desc">
                    일정 등록은 <span className="ai-point">오전 10시</span>에 가장 많이 이루어졌습니다.
                  </p>
                </div>
                <div className="stats-ai-block">
                  <p className="stats-card-value">알림</p>
                  <p className="stats-card-desc">
                    알림 클릭률은 평균 <span className="ai-point">76%</span>로 확인되었습니다.
                  </p>
                </div>
              </Card>

              {/* 재무 인사이트 */}
              <Card className="stats-card-box animate-fadeUp">
                <h3 className="stats-card-title text-lg md:text-xl font-bold mb-4">📊 재무 인사이트</h3>

                {/* 인사이트 항목 */}
                <div className="stats-ai-block">
                  <p className="stats-card-value">청구</p>
                  <p className="stats-card-desc">
                    최근 3개월 평균 청구 금액은 <span className="ai-point">₩1,200,000</span>입니다.
                  </p>
                </div>
                <div className="stats-ai-block">
                  <p className="stats-card-value">결제</p>
                  <p className="stats-card-desc">
                    최초 결제 응답까지 평균 <span className="ai-point">2.1일</span>이 소요됩니다.
                  </p>
                </div>
                <div className="stats-ai-block">
                  <p className="stats-card-value">매출 추세</p>
                  <p className="stats-card-desc">
                    금월 매출은 지난 달보다 <span className="ai-point">13%</span> 증가했습니다.
                  </p>
                </div>
                <div className="stats-ai-block">
                  <p className="stats-card-value">세금계산서</p>
                  <p className="stats-card-desc">
                    세금계산서 발행 정확도는 평균 <span className="ai-point">96%</span>를 유지하고 있습니다.
                  </p>
                </div>
                <div className="stats-ai-block">
                  <p className="stats-card-value">청구서 처리속도</p>
                  <p className="stats-card-desc">
                    청구서 생성까지 평균 <span className="ai-point">2.3초</span>가 소요됩니다.
                  </p>
                </div>
              </Card>
            </div>
          )}
      </div>
    </div>
  );
}

export default Stats;
