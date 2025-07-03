// ================================================
// 📁 Input.jsx
// 📌 공통 입력창 컴포넌트
// 📌 default.css의 .input 클래스를 기반으로 스타일 적용
// 📌 라벨(label)과 placeholder를 함께 사용할 수 있도록 구성
// ================================================

import React from "react";
import PropTypes from "prop-types";

/**
 * 📌 Input 컴포넌트 설명
 *
 * ✔ 역할:
 * - 공통 입력창(input type="text" 계열)을 일관된 스타일로 구성
 * - 외부에서 label/placeholder/value/onChange 등을 전달받아 동작
 *
 * ✔ 사용 예시:
 * <Input label="이메일" placeholder="example@domain.com" />
 * <Input label="금액" value={price} onChange={handleChange} />
 *
 * ✔ default.css 연동:
 * - `.input`: 기본 입력창 스타일
 * - `.input-error`: 유효성 오류 시 수동으로 전달 (에러 상태 시)
 *
 * ✔ props:
 * - label     : 입력창 상단에 보여질 이름 (선택 사항)
 * - id        : input 요소의 id 및 label의 htmlFor에 사용
 * - className : 추가 Tailwind 스타일을 덧붙일 수 있음
 * - 기타 input 속성 모두 지원 (type, value, onChange 등)
 */

const Input = ({
  label,
  id,
  className = "",
  error = false,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  const inputClass = `input ${error ? "input-error" : ""} ${className}`;

  return (
    <div className="mb-4">
      {/* ℹ️ 라벨 표시 (label이 있는 경우에만) */}
      {label && (
        <label htmlFor={inputId} className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* 🔘 입력 필드 */}
      <input id={inputId} className={inputClass} {...props} />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;
