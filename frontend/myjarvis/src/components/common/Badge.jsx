// 📁 Badge.jsx
// 📌 역할: 상태 표시용 뱃지 컴포넌트
// 📌 사용예: 태그, 승인상태, 필터 뱃지 등에서 사용
// 📌 default.css에 정의된 .badge, .badge-* 클래스에 맞춰 디자인됩니다.
//      클래스 종류:
//    - badge-gray
//    - badge-success
//    - badge-warning
//    - badge-danger
//  반드시 className에 위 클래스 중 하나를 전달해 주세요.

import React from "react";
import PropTypes from "prop-types";

const Badge = ({ text, type = "gray" }) => {
  return (
    <span className={`badge badge-${type}`}>
      {text}
    </span>
  );
};

Badge.propTypes = {
  /** 뱃지에 표시할 텍스트 */
  text: PropTypes.string.isRequired,

  /** 뱃지 타입: gray | success | warning | danger */
  type: PropTypes.oneOf(["gray", "success", "warning", "danger"]),
};

export default Badge;
