import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AgreeText() {

  return (
    <section className="agree-text">
      <h2>이용약관 전문</h2>
      <div className="content-box">
        <p>
          본 약관은 귀하가 서비스를 이용함에 있어 회사와 귀하 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
        </p>
        <p>
          제1조 목적 / 제2조 정의 / 제3조 약관의 게시와 개정 ...
          <br />
          (여기에 전체 약관 내용을 입력)
        </p>
            <Link to="/agree">이동</Link>
      </div>
    </section>
  );
}