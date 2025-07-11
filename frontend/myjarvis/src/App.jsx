import { Routes, Route, Navigate } from "react-router-dom";

//  0. 시작 페이지
import Home from "./pages/Home";

//  1. 공통 레이아웃 & 인증 페이지
import Main from "./component/common/Main";

//  2. 검색
import Search from "./component/search/Search";

//  3. 대시보드
import Dashboard from "./pages/Dashboard";

//  4. 고객관리
import CompanyList from "./component/company/CompanyList";

//  5. 계약관리
import Contract from "./component/contract/Contract";

//  6. 일정관리
import MySchedule from "./component/schedule/MySchedule";

//  7. 회의관리
import MeetingList from "./component/meeting/MeetingList";

//  8. 결제관리
import Invoice from "./component/invoice/Invoice";

//  9. 통계 확인
import Stats from "./component/stats/Stats";

//  10. 시스템 설정
import Setting from "./component/setting/Setting";

//  11. UI 스타일 가이드 (개발자 도구용)
import StyleGuide from "./pages/StyleGuide";

//  12. 소개 페이지 (외부 링크용)
import IntroSchedule from "./pages/IntroSchedule";
import IntroMeeting from "./pages/IntroMeeting";
import IntroContract from "./pages/IntroContract";
import IntroInvoice from "./pages/IntroInvoice";

//  13. 로그인 & 회원가입
import LoginPage from "./component/member/Login";
import Join from "./component/member/Join";
import Agree from "./component/member/Agree";
import AgreeText from "./component/member/AgreeText";
import AgreeTextSelect from "./component/member/AgreeTextSelect";

//  14. 마이페이지
import MemberMain from "./component/member/MemberMain";
import MemberUpd from "./component/member/MemberUpd";



function App() {
  return (
    <Routes>

      {/* 🔹 시작 페이지 (로그인 전 랜딩용) */}
      <Route path="/" element={<Home />} />

      {/* 🔹 로그인 페이지 */}
      <Route path="/login" element={<LoginPage />} />

      {/* 🔹 회원가입 / 약관 관련 */}
      <Route path="/join" element={<Join />} />
      <Route path="/agree" element={<Agree />} />
      <Route path="/agreeText" element={<AgreeText />} />
      <Route path="/agreeTextSelect" element={<AgreeTextSelect />} />

      {/* 🔹 마이페이지 관련 */}
      <Route path="/member/*" element={<MemberMain />} />
      <Route path="/memberUpd/:memberId" element={<MemberUpd />} />

      {/* 🔹 로그인 후 메인 레이아웃 (좌측 GNB + 우측 Outlet) */}
      <Route path="/main" element={<Main />}>

        {/* ▶ 대시보드 (기본 페이지) */}
        <Route index element={<Dashboard />} />

        {/* ▶ 검색 */}
        <Route path="search" element={<Search />} />

        {/* ▶ 고객관리 */}
        <Route path="company/list" element={<CompanyList />} />

        {/* ▶ 계약관리 */}
        <Route path="contract" element={<Contract />} />

        {/* ▶ 일정관리 */}
        <Route path="schedule" element={<MySchedule />} />

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
      </Route>

      {/* 🔹 소개 페이지 (외부 링크용 임시 연결) */}
      <Route path="/intro/schedule" element={<IntroSchedule />} />
      <Route path="/intro/meeting" element={<IntroMeeting />} />
      <Route path="/intro/contract" element={<IntroContract />} />
      <Route path="/intro/invoice" element={<IntroInvoice />} />

      {/* 🔹 잘못된 경로 접근 시 홈으로 리다이렉트 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
