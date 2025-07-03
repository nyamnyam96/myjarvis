// ================================================
// 📁 Button.jsx
// 📌 공통 버튼 컴포넌트
// 📌 사용자는 props를 통해 버튼의 스타일/이벤트를 제어할 수 있음
// 📌 적용 스타일은 default.css 내 정의된 .btn 계열 클래스 기반
// ================================================

import React from "react";
import PropTypes from "prop-types";

/**
 * 📌 Button 컴포넌트 설명
 *
 * ✔ 역할:
 * - 공통 버튼 UI를 구성
 * - default.css에 정의된 클래스(.btn, .btn-primary 등)를 props로 적용
 *
 * ✔ 사용 방법 예시:
 * <Button>기본 버튼</Button>
 * <Button variant="primary">등록</Button>
 * <Button variant="outline" onClick={handleClick}>취소</Button>
 * <Button variant="danger" disabled>삭제</Button>
 * <Button variant="disabled">제출 중</Button>  ✅ [new]
 *
 * ✔ variant 옵션:
 * - primary   : 주요 동작 버튼 (파란 배경)
 * - outline   : 테두리 버튼 (흰 배경 + 보라 테두리)
 * - danger    : 삭제/경고용 버튼 (빨간 배경)
 * - disabled  : 완전 비활성 버튼 (회색 배경, hover 없음)
 * - default   : 배경 없음 (기본 스타일만)
 *
 * ✔ disabled 옵션:
 * - true일 경우 버튼 동작 비활성화
 * - 단, 스타일은 variant에 따라 적용됨
 */

const Button = ({
  children,
  type = "button",
  onClick,
  variant = "primary", // 'primary' | 'outline' | 'danger' | 'disabled' | 'default'
  disabled = false,
  className = "",
}) => {
  // 기본 클래스
  let baseClass = "btn";

  // 스타일 클래스 분기
  switch (variant) {
    case "primary":
      baseClass += " btn-primary";
      break;
    case "outline":
      baseClass += " btn-outline";
      break;
    case "danger":
      baseClass += " btn-danger";
      break;
    case "disabled":
      baseClass = "btn-disabled"; //  단독 적용 (btn과 결합 금지)
      break;
    default:
      break; // 기본 .btn만 적용
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || variant === "disabled"} //  클릭 차단 보장
      className={`${baseClass} ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "outline", "danger", "disabled", "default"]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
