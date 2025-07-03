// ================================================
// 📁 Card.jsx
// 📌 공통 카드 레이아웃 컴포넌트
// 📌 박스형 컨테이너 UI로 사용되는 기본 구조
// 📌 default.css의 .card 클래스를 기반으로 스타일링됨
// ================================================

import React from "react";
import PropTypes from "prop-types";

/**
 * 📌 Card 컴포넌트 설명
 *
 * ✔ 역할:
 * - 페이지 내 "섹션" 또는 "정보 블록"을 감싸는 시각적 컨테이너
 * - 배경, 패딩, 그림자, 둥근 테두리 등은 default.css의 `.card`에서 일괄 제어
 *
 * ✔ 사용 예시:
 * <Card>
 *   <h2 className="section-title">회의 정보</h2>
 *   <p>참석자: 홍길동 외 2명</p>
 * </Card>
 *
 * ✔ props:
 * - children: 내부에 포함될 JSX 요소들
 * - className: 외부에서 추가 스타일을 덧붙일 때 사용
 */

const Card = ({ children, className = "" }) => {
  return (
    <div className={`card ${className}`}>
      {/* ℹ️ 카드 내부 콘텐츠 영역 */}
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
