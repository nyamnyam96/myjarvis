// ================================================
// 📁 Card.jsx
// 📌 공통 카드 레이아웃 컴포넌트
// 📌 내부 padding 분리 → card-inner로 관리
// ================================================

import React from "react";
import PropTypes from "prop-types";
import "../../styles/default.css";

/**
 * 📌 Card 컴포넌트 설명
 *
 * ✔ 역할:
 * - 페이지 내 섹션/블록을 감싸는 시각적 컨테이너
 * - 높이/스크롤 이슈 방지를 위해 `.card`는 layout 담당
 * - `.card-inner`는 내부 콘텐츠 및 padding 담당
 *
 * ✔ 구조:
 * <div className="card">
 *   <div className="card-inner"> ... </div>
 * </div>
 */

const Card = ({ children, className = "" }) => {
  return (
    <div className={`card ${className}`}>
      <div className="card-inner">{children}</div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
