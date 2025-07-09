// src/component/common/Header.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import DropdownMenu from "../../components/user/DropdownMenu";

function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef();

  const serviceItems = [
    { label: "일정 관리", path: "/intro/schedule" },
    { label: "회의 지원", path: "/intro/meeting" },
    { label: "계약 체결", path: "/intro/contract" },
    { label: "결제 및 청구", path: "/intro/invoice" },
  ];

  const handleSelect = (item) => {
    navigate(item.path);
    setIsOpen(false);
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 스크롤 감지 → 헤더 스타일 전환
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "fixed bg-white shadow-md text-gray-800" : "absolute bg-transparent text-white"
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4 relative">
        {/* MyJarvis 텍스트 */}
        <h1 className="text-3xl font-black tracking-tight">MyJarvis</h1>

        {/* 드롭다운 + 로그인 */}
        <div ref={dropdownRef} className="flex items-center space-x-3 relative">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-1 px-5 py-2.5 border border-current rounded shadow-sm text-base font-medium hover:bg-white/10 transition whitespace-nowrap"
          >
            서비스 소개
            <span
              className={`inline-block transform transition-transform duration-200 text-xl ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </button>

          {isOpen && (
            <div className="absolute top-full right-16 mt-2 z-50 min-w-[160px]">
              <DropdownMenu items={serviceItems} onSelect={handleSelect} />
            </div>
          )}

          <button
            onClick={() => navigate("/login")}
            className="text-base px-5 py-2.5 rounded transition font-medium bg-gray-800 text-white hover:bg-gray-700"
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
