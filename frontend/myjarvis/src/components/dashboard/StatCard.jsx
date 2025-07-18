import React from "react";

/**
 * 📊 StatCard - 대시보드 요약용 통계 카드
 *
 * 사용된 클래스 (default.css 기준):
 * - .stat-card: 카드 전체 컨테이너
 * - .stat-icon: 왼쪽 아이콘 영역
 * - .stat-number: 주요 숫자 수치
 * - .stat-label: 설명 텍스트
 *
 * ✔ 데이터 연동을 고려해 null/undefined 방어 처리 포함
 */

const StatCard = ({ icon, number, label, numberClass = "", labelClass = "" }) => {
  return (
    <div className="stat-card">
      {icon && <div className="stat-icon">{icon}</div>}
      <div>
        <div className={`stat-number ${numberClass}`}>{number ?? "-"}</div>
        <div className={`stat-label ${labelClass}`}>{label ?? ""}</div>
      </div>
    </div>
  );
};

export default StatCard;
