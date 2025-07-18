import React, { useEffect, useState } from "react";
import "./Setting.css";
import SwitchToggle from "../../components/control/SwitchToggle";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import MemberMain from "../member/MemberMain";
import useThemeStore from '../../store/useThemeStore';
import BgInsert from "./BgInsert";

const Setting = () => {
  const { isDarkMode, toggleTheme, initializeTheme } = useThemeStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alarm, setAlarm] = React.useState(true);
  const [invoiceDefault, setInvoiceDefault] = React.useState(false);
  const [sessionTime, setSessionTime] = React.useState(true);
  const [signatureSave, setSignatureSave] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <div className="setting-wrapper">
      <div className="setting-grid">
      {/* 환경 설정 카드 */}
      <div className="setting-card">
        <h2 className="section-title mb-4">환경 설정</h2>
        <div className="space-y-5">
          <div className="setting-item">
            <span className="setting-label">다크모드 / 라이트모드 전환</span>
            <SwitchToggle checked={isDarkMode} onChange={toggleTheme} />
          </div>
          <div className="setting-item">
            <span className="setting-label">알람 수신 설정 ON / OFF</span>
            <SwitchToggle checked={alarm} onChange={setAlarm} />
          </div>
          <div className="setting-item">
            <span className="setting-label">청구서 기본 설정</span>
            <button
              onClick={() => alert("청구서 기본 설정 기능은 추후 제공됩니다.")}
              className="setting-link"
            >
              설정
            </button>
          </div>
          <div className="setting-item">
            <span className="setting-label">세션 시간 설정</span>
            <button
              onClick={() => alert("세션 시간 설정 기능은 추후 제공됩니다.")}
              className="setting-link"
            >
              설정
            </button>
          </div>
          <div className="setting-item">
            <span className="setting-label">개인 전자서명 저장하기</span>
            <button
              onClick={() => alert("전자서명 저장 기능은 추후 제공됩니다.")}
              className="setting-link"
            >
              설정
            </button>
          </div>

          <div className="setting-background">
            <div className="setting-item mb-2">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                사용자 설정 배경
              </h3>
              <Button
                className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#1E1BFF] to-[#7C3AED] hover:brightness-110"
                onClick={() => setIsModalOpen(true)}
              >
                배경 등록
              </Button>
              <BgInsert isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-300">
              대시보드에 표시할 배경을 사용자 설정으로 등록할 수 있어요.
            </p>
          </div>
        </div>
      </div>

      {/* 마이페이지 카드 */}
      <div className="setting-card flex flex-col">
        <div>
          <h2 className="section-title mb-2">마이 페이지</h2>
          <p className="text-sm text-gray-500 mb-4">개인정보, 로그인 정보 등 확인</p>
        </div>
        <div>
          <MemberMain />
        </div>
      </div>
     </div> 
    </div>
  );
};

export default Setting;
