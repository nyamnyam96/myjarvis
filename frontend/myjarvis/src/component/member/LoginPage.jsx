import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import "./LoginPage.css";

function LoginPage() {
  const { login } = useUserStore(); // store에서 login 함수를 가져옴
  const navigate = useNavigate();

  function loginButton(){
    // 실제로는 아이디/비밀번호 검증 후 성공 시 login() 호출
    alert("로그인 성공! 대시보드로 이동합니다.");
    // zustand 스토어의 상태를 '로그인'으로 변경합니다.
    login();
    // 4. 상태 변경 직후, 메인 페이지('/')로 강제 이동시킵니다.
    navigate("/Main");
  };

  return (
    <div className="login-page-container">
      <div className="login-box">
        <h1>MyJarvis</h1>
        <p>업무의 시작, MyJarvis와 함께</p>
        <button onClick={loginButton}>로그인하기(테스트용)</button>
      </div>
    </div>
  );
}

//선언한 함수를 export default로 내보내기.
export default LoginPage;




