import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import './AgreeText.css';

export default function AgreeText() {

  return (
    <section className="agreeText-text">
      <div className="agreeText-container">
        <div style={{ height: 50, fontWeight: 800 }}>이용약관 전문</div>
      
        <p>
          본 약관은 귀하가 서비스를 이용함에 있어 회사와 귀하 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
        </p>
        <p>
          제1조 목적 / 제2조 정의 / 제3조 약관의 게시와 개정 ...
          <br />
          여러분을 환영합니다.
          MyJarvis 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 MyJarvis 서비스의 이용과 관련하여 MyJarvis 서비스를 제공하는 MyJarvis 주식회사(이하 ‘MyJarvis’)와 이를 이용하는 MyJarvis 서비스 회원(이하 ‘회원’) 관계를 설명하며, 아울러 여러분의 MyJarvis 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.

          MyJarvis 서비스를 이용하시거나 MyJarvis 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.

        </p>
            <Link to="/agree" className="agree-button">확인</Link>
          
      </div>
    </section>
  );
}