// 📌 Stepper.jsx
// - 프로세스 진행 단계를 시각적으로 표시하는 컴포넌트입니다.
// - 예: 계약 진행 단계, 회원가입 단계 등
// - .active 클래스로 현재 단계 표현

import React from 'react';

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="stepper">
      {steps.map((step, idx) => (
        <React.Fragment key={idx}>
          <div className={`step ${idx === currentStep ? 'active' : ''}`}>{idx + 1}</div>
          {idx < steps.length - 1 && <div className="step-line" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
