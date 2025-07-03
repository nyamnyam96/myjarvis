import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./component/member/LoginPage";
import Main from "./component/common/Main";
import CompanyList from "./component/company/CompanyList";

function App() {
  return (
    <Routes>
      
      {/* 로그아웃 상태에서만 보이는 페이지 */}
      <Route path="/login" element={<LoginPage />} />

      {/* 로그인 상태에서만 보이는 대시보드 페이지 */}      
      <Route path="/" element={<Main />}>        
        <Route path="company/list" element={<CompanyList />} />
        <Route path="/style-guide" element={<StyleGuide />} />
      </Route>

    </Routes>

  );
}

export default App;