// src/pages/Setting.jsx

import React from 'react';
import SwitchToggle from '../../components/control/SwitchToggle';
import Button from '../../components/common/Button';
import { useNavigate, Route, Routes } from 'react-router-dom';
import MemberMain from '../member/MemberMain';

const Setting = () => {
  // 스위치 상태는 각 항목별로 독립적으로 useState로 관리
  const [darkMode, setDarkMode] = React.useState(false);
  const [alarm, setAlarm] = React.useState(true);
  const [invoiceDefault, setInvoiceDefault] = React.useState(false);
  const [sessionTime, setSessionTime] = React.useState(true);
  const [signatureSave, setSignatureSave] = React.useState(false);

  const navigate = useNavigate();

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 환경 설정 카드 */}
      <div className="card">
        <h2 className="section-title mb-4">환경 설정</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-normal text-gray-800">다크모드 / 라이트모드 전환</span>
              <SwitchToggle checked={darkMode} onChange={setDarkMode} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-normal text-gray-800">알람 수신 설정 ON / OFF</span>
              <SwitchToggle checked={alarm} onChange={setAlarm} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-normal text-gray-800">청구서 기본 설정</span>
              <SwitchToggle checked={invoiceDefault} onChange={setInvoiceDefault} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-normal text-gray-800">세션 시간 설정</span>
              <SwitchToggle checked={sessionTime} onChange={setSessionTime} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-normal text-gray-800">개인 전자서명 저장하기</span>
              <SwitchToggle checked={signatureSave} onChange={setSignatureSave} />
            </div>
          </div>
      </div>

      {/* 마이페이지 카드 */}
      

      <div className="card flex flex-col justify-between">
        <div>
          <h2 className="section-title mb-2">마이 페이지</h2>
          <p className="text-sm text-gray-500 mb-4">개인정보, 로그인 정보 등 확인</p>
        </div>
        <div>
        {/*
          <Button size="sm" color="gray" onClick={() => navigate('/member/*')}>
            마이페이지 바로 가기 
          </Button> 
          */}
           <MemberMain />
        </div>
      </div>
    </div>
  );
};

export default Setting;
