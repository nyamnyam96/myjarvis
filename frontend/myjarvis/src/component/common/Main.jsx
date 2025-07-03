import { useEffect } from "react";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import useUserStore from "../../store/useUserStore";

function Main() {
  const { isLogined, logout } = useUserStore();
  const navigate = useNavigate();

  // 로그인 상태가 아니라면 로그인 페이지로 튕겨내는 로직
  useEffect(() => {
    if (!isLogined) {
      navigate("/login");
    }
  }, [isLogined, navigate]);

  // 로그인 상태가 아닐 때는 아무것도 보여주지 않음 (튕겨내는 중)
  if (!isLogined) {
    return null;
  }

  // 로그인 상태일 때만 GNB와 컨텐츠 영역을 보여줌
  return (
    <div className="app-container">      
        <nav className="gnb">
          <div className="gnb-header">  
            <Link to="/">
              <h1 className="gnb-title">MyJarvis</h1>
            </Link>   
          </div>          
            <ul className="gnb-menu">
              <li>
              <NavLink to="/">
                <span className="material-symbols-outlined">dashboard</span>
                <span>대시보드 홈</span>
              </NavLink>
              </li>
              <li>
                <NavLink to="/company/list">
                  <span className="material-symbols-outlined">business_center</span>
                  <span>고객사 관리</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/contracts">
                  <span className="material-symbols-outlined">request_quote</span>
                  <span>계약 관리</span>
                </NavLink>
              </li>
            </ul>
        </nav>    

      {/* 위의 링크 클릭 시 내용이 뿌려지는 영역임. */}
      <div className="content-container">        
        <Outlet />
      </div>
    </div>
  );
}

export default Main;