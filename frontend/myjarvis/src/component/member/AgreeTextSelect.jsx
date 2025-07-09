import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import './AgreeTextSelect.css';

export default function AgreeTextSelect() {

  return (
    <section className="agree-text">
      <div className="main-container">
      <div style={{ height: 50, fontWeight: 1000 }}>이용약관 전문</div>
        <p>
          본 약관은 귀하가 서비스를 이용함에 있어 광고, 의무 및 책임사항을 규정함을 목적으로 합니다.
        </p>
        <p>
          제1조 목적 / 제2조 정의 / 제3조 약관의 게시와 개정 
          <br />
          (I-class 배재현 강사 100퍼센트 전액 할인)
        </p>
            <Link to="/agree" className="agree-button">확인</Link>
      </div>
    </section>
  );
}