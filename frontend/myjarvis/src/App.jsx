import { Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./component/member/Login";

// 1. 공통 레이아웃 & 인증 페이지

import Main from "./component/common/Main";
import LoginPage from "./component/member/LoginPage";

// 2. 검색
import Search from "./component/search/Search";

// 3. 대시보드 페이지
import Dashboard from "./pages/Dashboard";

// 4. 고객관리 메뉴 (고객사, 담당자, 연락처 등)
import CompanyList from "./component/company/CompanyList";

// 5. 계약관리
import Contract from "./component/contract/Contract";

// 6. 일정관리
import MySchedule from "./component/schedule/MySchedule";

// 7. 회의관리
import MeetingList from "./component/meeting/MeetingList";

// 8. 결제관리
import Invoice from "./component/invoice/Invoice";

// 9. 통계 확인
import Stats from "./component/stats/Stats";

// 10. 시스템 설정
import Setting from "./component/setting/Setting";

// 11. UI 스타일 가이드 (개발자 도구용)
import StyleGuide from "./pages/StyleGuide";


<<<<<<< HEAD
import Join from "./component/member/Join";
import Agree from "./component/member/Agree";
import AgreeText from "./component/member/AgreeText";
import MemberMain from "./component/member/MemberMain";
import MemberUpd from "./component/member/MemberUpd";
import LoginPage from "./component/member/LoginPage";

import AgreeTextSelect from "./component/member/AgreeTextSelect";
=======
>>>>>>> fa49b8a915d11ba746ee78cd361247b97d7d4752
function App() {
  return (
    
    <main className="content">
    <Link to="/Login">로그인 여기</Link>
    <hr/> {/* <LeftMenu/> 쪽에 넣어야할것*/}
    <Link to="/member">마이페이지</Link>
    <Routes>
<<<<<<< HEAD

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
        
=======

      {/*  로그인 전 페이지 (로그인 전용) */}
      <Route path="/login" element={<LoginPage />} />

      {/*  로그인 후 메인 레이아웃 (좌측 GNB + 우측 Outlet) */}
      <Route path="/" element={<Main />}>

        {/* ▶ 검색 */}
        <Route path="/search" element={<Search />} />

        {/* ▶ 대시보드 (기본 페이지) */}
        <Route index element={<Dashboard />} />

        {/* ▶ 고객관리 */}
        <Route path="company/list" element={<CompanyList />} />

        {/* ▶ 계약관리 */}
        <Route path="contract" element={<Contract />} />

        {/* ▶ 일정관리 */}
        <Route path="schedule" element={<MySchedule/>} />

        {/* ▶ 회의관리 */}
        <Route path="meeting" element={<MeetingList />} />

        {/* ▶ 결제관리 */}
        <Route path="invoice" element={<Invoice />} />

        {/* ▶ 통계 확인 */}
        <Route path="stats" element={<Stats />} />

        {/* ▶ 시스템 설정 */}
        <Route path="setting" element={<Setting />} />

        {/* ▶ 개발자용 스타일 가이드 */}
        <Route path="style-guide" element={<StyleGuide />} />
>>>>>>> fa49b8a915d11ba746ee78cd361247b97d7d4752
      </Route>

      {/*  잘못된 경로 접근 시 로그인으로 리다이렉트 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
<<<<<<< HEAD
    </main>
=======
>>>>>>> fa49b8a915d11ba746ee78cd361247b97d7d4752
  );
}

export default App;
