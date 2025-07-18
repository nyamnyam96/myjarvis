import { useEffect } from "react";
import { NavLink, Link, Outlet, useNavigate, useLocation, Navigate } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import useThemeStore from "../../store/useThemeStore";
import axios from "axios";
function Main() {
  const { isLogined } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const { setIsLogined, setLoginMember, setAccessToken, setRefreshToken } = useUserStore();
  //세션 파기 요청
  const handleLogout = async () => {
    try {
      // 서버에서 세션 파기 요청
      await axios.get("/logout", { withCredentials: true });
  
      
      // 클라이언트 상태 초기화
      setIsLogined(false);
      setLoginMember(null);
      setAccessToken(null);
      setRefreshToken(null);

      // 상태 초기화 후 /home 경로로 이동시킵니다.
      navigate("/home"); 
      
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  }


const initializeTheme = useThemeStore((state) => state.initializeTheme);

useEffect(() => {
    initializeTheme(); // 다크모드 상태 반영
}, []);

    const mainMenus = [
      { to: "/main/search", icon: "search", label: "검색" },
      { to: "/main", icon: "home", label: "대시보드" },
      { to: "/main/company/list", icon: "add_business", label: "고객사관리" },
      { to: "/main/contract/list", icon: "handshake", label: "계약관리" },
      { to: "/main/invoice/list", icon: "contract_edit", label: "청구관리" },
      { to: "/main/schedule", icon: "calendar_today", label: "일정관리" },
      { to: "/main/meeting", icon: "groups", label: "회의관리" },
    ];

    const bottomMenus = [
      { to: "/main/stats", icon: "analytics", label: "통계확인" },
      { to: "/main/setting", icon: "settings", label: "환경설정" },
      { to: null, icon: "logout", label: "로그아웃" , onClick : handleLogout}, // 로그아웃은 별도 처리
      //로그아웃 세션파기 다시 못들어감
    ];


const renderMenuItem = (item) => {
  const isActive =
    item.to === "/main"
      ? location.pathname === "/main"
      : location.pathname.startsWith(item.to || "");

    return (
      <li key={item.label} className="relative">
        {item.onClick ? (
          <div
            onClick={item.onClick}
            className={`
              group flex items-center gap-3 px-4 py-2.5 pr-6 rounded-lg text-[15px]
              transition-all duration-200 ease-in-out cursor-pointer
              text-[#a3aed0] hover:text-[#2b3674] hover:bg-[#f4f7fe]
              dark:text-[#b0b3c9] dark:hover:text-[#e4e7f5] dark:hover:bg-[#2c2e45]
            `}
          >
            <span
              className={`
                material-symbols-outlined text-[20px] transition-colors duration-200
                text-[#a3aed0] group-hover:text-[#4318ff]
                dark:text-[#b0b3c9] dark:group-hover:text-[#7551ff]
              `}
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </div>
        ) : (
          <NavLink
            to={item.to}
            className={`
              group flex items-center gap-3 px-4 py-2.5 pr-6 rounded-lg text-[15px]
              transition-all duration-200 ease-in-out cursor-pointer
              ${
                isActive
                  ? "text-[#2b3674] dark:text-[#e4e7f5] font-bold"
                  : "text-[#a3aed0] dark:text-[#b0b3c9] hover:text-[#2b3674] dark:hover:text-[#e4e7f5] hover:bg-[#f4f7fe] dark:hover:bg-[#2c2e45]"
              }
            `}
          >
            <span
              className={`
                material-symbols-outlined text-[20px] transition-colors duration-200
                ${
                  isActive
                    ? "text-[#4318ff] dark:text-[#7551ff]"
                    : "text-[#a3aed0] dark:text-[#b0b3c9] group-hover:text-[#4318ff] dark:group-hover:text-[#7551ff]"
                }
              `}
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </NavLink>
        )}

      {/* 우측 강조선: NavLink인 경우만 표시 */}
        {isActive && !item.onClick && (
          <div className="absolute top-1/2 -translate-y-1/2 right-[-18px] w-[4px] h-[32px] bg-[#4318ff] dark:bg-[#7551ff] rounded-full" />
        )}
    </li>
  );
};

  return (

    <div className="flex h-screen p-5 gap-5 box-border bg-[#f4f7fe] dark:bg-[#1a1a2e] text-[#2a3547] dark:text-[#e0e6ed] font-['Pretendard']">

      {/* 좌측 GNB */}
      <nav className="w-[260px] bg-white dark:bg-[#21243a] rounded-xl shadow-md flex flex-col p-5 shrink-0 relative">

        {/* 로고 */}
        <div className="pb-5 mb-0 border-b border-[#e5eaef] dark:border-[#3b3e52]">
          <div
            className="flex items-center justify-center h-16 cursor-default select-none"
            aria-hidden="true"
          >
            <h1 className="text-[33px] font-extrabold tracking-tight text-[#1B254B] dark:text-white font-logo">
              MyJarvis
            </h1>
          </div>
        </div>

        {/* 기본 메뉴 */}
        <ul className="flex-grow py-4 space-y-1">
          {mainMenus.map(renderMenuItem)}
        </ul>

        {/* 하단 고정 메뉴 */}
        <ul className="pt-3 border-t border-[#e5eaef] dark:border-[#3b3e52] space-y-1">
          {bottomMenus.map(renderMenuItem)}
        </ul>
      </nav>

      {/* 메인 콘텐츠 */}
      <div className="flex flex-col flex-grow bg-[#f4f7fe] dark:bg-[#1a1a2e] overflow-y-auto px-3 pt-6 pb-3">
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
