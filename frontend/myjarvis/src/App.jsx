import { Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./component/member/Login";
import Main from "./component/common/Main";
import CompanyList from "./component/company/CompanyList";
import StyleGuide from "./pages/StyleGuide";


import Join from "./component/member/Join";
import Agree from "./component/member/Agree";
import AgreeText from "./component/member/AgreeText";
import MemberMain from "./component/member/MemberMain";
import MemberUpd from "./component/member/MemberUpd";
import LoginPage from "./component/member/LoginPage";

import AgreeTextSelect from "./component/member/AgreeTextSelect";
function App() {
  return (
    
    <main className="content">
    <Link to="/Login">로그인 여기</Link>
    <hr/> {/* <LeftMenu/> 쪽에 넣어야할것*/}
    <Link to="/member">마이페이지</Link>
    <Routes>

      {/* 로그아웃 상태에서만 보이는 페이지 */}
      <Route path='/loginPage' element={<LoginPage /> } />
      {/* 로그인후 동의하기 */} 
      <Route path='/agree' element={<Agree />} />
      <Route path='/agreeText' element={<AgreeText />} />
      <Route path='/agreeTextSelect' element={<AgreeTextSelect />} />
      
      
      {/* 동의후 회원가입 창 */} 
      <Route path="/join" element={<Join />} />
      <Route path='/login' element={<Login />} />

      {/* 마이페이지 */}
      <Route path='/member/*' element={<MemberMain />} /> {/* /member로 시작하는 path는 MemberMain 컴포넌트를 라우팅 */}
      {/* 마이페이지 수정하기*/}
      <Route path='/memberUpd/:memberId' element={<MemberUpd />} />

      
      {/* 로그인 상태에서만 보이는 대시보드 페이지 */}      
        <Route path="/" element={<Main />}>        
        <Route path="company/list" element={<CompanyList />} />
        <Route path="/style-guide" element={<StyleGuide />} />
        
      </Route>

    </Routes>
    </main>
  );
}

export default App;