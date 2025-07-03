// 📁 src/components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { FaSearch, FaUserFriends, FaCalendarAlt, FaSignOutAlt, FaChartPie,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* 📌 상단 로고 */}
      <div className="sidebar-header">
        MyJarvis
      </div>

      {/* 📌 메뉴 리스트 */}
      <div className="sidebar-menu">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <FaChartPie className="sidebar-icon" />
          대시보드
        </NavLink>

        <NavLink to="/search" className="sidebar-item">
          <FaSearch className="sidebar-icon" />
          검색
        </NavLink>

        <NavLink to="/clients" className="sidebar-item">
          <FaUserFriends className="sidebar-icon" />
          고객 관리
        </NavLink>

        <NavLink to="/schedule" className="sidebar-item">
          <FaCalendarAlt className="sidebar-icon" />
          일정 관리
        </NavLink>

        <div className="sidebar-divider" />

        {/* 📌 로그아웃 */}
        <div className="sidebar-item">
          <FaSignOutAlt className="sidebar-icon" />
          로그아웃
        </div>
      </div>
    </aside>
  );
}
