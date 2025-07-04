import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import "./LoginPage.css";
import { Route, Link } from "react-router-dom";
function LoginPage() {
  
  

  

  return (
    <div className="login-page-container">
      <div className="login-box">
        <h1>MyJarvis</h1>
        <p>업무의 시작, MyJarvis와 함께</p>
         <Link to="/Login">로그인 여기</Link>
      </div>
    </div>
  );
}

//선언한 함수를 export default로 내보내기.
export default LoginPage;




