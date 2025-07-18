import React from 'react';
import Header from '../component/common/Header.jsx';
import { motion } from 'framer-motion';
import bgIntro1 from '../assets/bg_intro3.jpg';
import MyJarvisLogo from "../assets/logo-myJarvis.png";
import '../styles/default.css';
import sample7 from '../assets/sample7.jpg';
import sample8 from '../assets/sample8.jpg';
import sample9 from '../assets/sample9.jpg';

const IntroSchedule = () => {
  return (
    <div className="w-full">
      {/*  공통 Header 포함 */}
      <Header />

      {/* 섹션 1 - Hero 개선 버전 */}
      <section className="w-full min-h-screen bg-[#181a27] text-white flex flex-col justify-center items-center px-6 py-36">
        <div className="flex flex-col items-center text-center max-w-4xl space-y-8">
          {/* 제목 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-extrabold leading-tight"
          >
          프리랜서를 위한 계약의 기준을 새롭게.
          </motion.h1>

          {/* 설명 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300"
          >
            MyJarvis는 견적부터 계약, 일정 연동까지 
            프리랜서를 위한 스마트 계약 관리 서비스를 한 번에 제공합니다. 
          </motion.p>

          {/* 아래 화살표 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-2xl animate-bounce"
          >
            ↓
          </motion.div>
        </div>
      </section>

      {/* 섹션 2 - Framer Motion + 컬러 리듬 카드 */}
      <section className="w-full min-h-screen bg-[#181a27] text-white flex flex-col justify-center items-center px-6 py-48">
        <div className="max-w-6xl w-full text-center">
          <h2 className="text-5xl font-extrabold mb-20 leading-tight">
            계약, 제대로 관리되고 있나요?<br />
            단 한 번의 실수가 비용이 될 수 있습니다.
          </h2>
            <br />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full">
              {[        
                { id: 1, text: "메일·문서로 흩어진\n계약 내역의 분산 관리" },
                { id: 2, text: "서명 후 일정 연동\n자동화 미흡 문제" },
                { id: 3, text: "계약 상태 및 기간\n관리 체계 부재" },
                { id: 4, text: "클라이언트별 계약\n이력 확인 어려움" },    
              ].map(({ id, text }, index) => {
                const bgColors = ['#1f1f27', '#222530', '#26293a', '#2a2d42'];
                const bgColor = bgColors[index % bgColors.length];
                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative p-10 rounded-3xl shadow-2xl flex flex-col items-center justify-center min-h-[260px] text-center"
                    style={{ backgroundColor: bgColor }}
                  >
                    <div className="absolute -top-6 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl shadow-md">
                      {id}
                    </div>
                    <p className="mt-10 text-xl whitespace-pre-line text-gray-200 font-semibold leading-snug">
                      {text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
        </div>
      </section>

      {/* 섹션 3 - 소개 전환 영역 (배경) */}
        <section className="relative w-full h-[100vh] bg-[#181a27] overflow-hidden">
          {/* 배경 이미지 + 하단 자연스러운 전환 그라데이션 */}
          <div className="absolute inset-0 z-0">
              <img
                src={bgIntro1}
                alt="intro background"
                className="w-full h-full object-cover"
              />
            {/* 그라데이션이 상단은 배경색과 자연스럽게 이어지고 하단은 이미지로 전환됨 */}
            <div className="absolute top-0 left-0 w-full h-[220px] bg-gradient-to-b from-[#181a27] via-[#181a27]/70 to-transparent z-10" />
          </div>

          {/* 텍스트 콘텐츠 */}
          <div className="absolute top-[12%] left-[72%] transform -translate-x-1/2 z-10 text-center w-full max-w-[1200px] px-6 flex flex-col items-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-snug"
            >
            계약의 체결부터 이행까지, 흐름을 놓치지 마세요.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-200"
            >
            계약 작성, 승인, 상태 관리, 일정 연동까지 모든 과정을 MyJarvis가 연결해 드립니다.
            </motion.p>
          </div>
        </section>

      {/* 섹션 4 - 소개 카드 영역 (밝은 배경) */}
        <section className="bg-white pt-60 pb-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto space-y-[160px]">
            {/* 기능 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12 py-12">
              <motion.div
                className="w-full md:w-1/2 flex justify-center"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={sample7}
                  alt="일정 등록 화면"
                  className="w-[640px] h-[400px] object-cover rounded-xl shadow-xl"
                />
              </motion.div>
              <motion.div
                className="w-full md:w-1/2 text-right"
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-4xl font-bold text-gray-900 mb-6">전자 계약서 작성 및 관리</h3>
                <p className="text-xl text-gray-500 font-medium tracking-wide leading-relaxed">
                  계약 항목을 손쉽게 입력하고, 표준 양식 기반으로 계약서를 생성합니다.<br />
                  모든 계약은 프로젝트/고객별로 체계적으로 관리되며,<br />
                  상태별(작성 중/체결/종료)로 구분해 추적이 가능합니다.
                </p>
              </motion.div>
            </div>

            {/* 기능 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 py-12">
              <motion.div
                className="w-full md:w-1/2 flex justify-center"
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={sample8}
                  alt="자동 연동"
                  className="w-[640px] h-[400px] object-cover rounded-xl shadow-xl"
                />
              </motion.div>
              <motion.div
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-4xl font-bold text-gray-900 mb-6">계약 일정 자동 연동</h3>
                <p className="text-xl text-gray-500 font-medium tracking-wide leading-relaxed">
                  계약 체결 시 자동으로 관련 일정이 등록되어,<br />
                  후속 작업과 일정 관리의 연결이 자연스럽게 이어집니다.<br />
                  계약 변경 시에도 연동된 일정이 함께 반영됩니다.
                </p>
              </motion.div>
            </div>

            {/* 기능 3 */}
            <div className="flex flex-col md:flex-row items-center gap-12 py-12">
              <motion.div
                className="w-full md:w-1/2 flex justify-center"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={sample9}
                  alt="캘린더 통합 뷰"
                  className="w-[640px] h-[400px] object-cover rounded-xl shadow-xl"
                />
              </motion.div>
              <motion.div
                className="w-full md:w-1/2 text-right"
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-4xl font-bold text-gray-900 mb-6">계약 히스토리 및 버전 관리</h3>
                <p className="text-xl text-gray-500 font-medium tracking-wide leading-relaxed">
                  계약서의 수정 이력과 상태 변경 내역을<br />
                  시간순으로 확인할 수 있어 투명한 관리가 가능합니다.<br />
                  과거 버전과 비교도 지원하여 리스크를 줄입니다.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full min-h-screen bg-white flex flex-col items-center justify-center px-6 py-40"
            >
            {/* 강조 문구 */}
            <motion.p
              className="text-center text-xl md:text-2xl text-gray-600 font-semibold mb-12 px-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              중요한 계약, 더는 복잡하게 처리하지 마세요. <br className="hidden md:inline" />
              모든 계약이 근거 있고 투명하게 진행되도록 
            </motion.p>
            <br />
              {/* 브랜드 로고 */}
              <motion.img
                src={MyJarvisLogo}
                alt="MyJarvis Logo"
                className="w-[360px] md:w-[520px] mb-16"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                />       
                {/* CTA 강조 문구 */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                    onClick={() => window.location.href = '/login'}
                    className="text-lg md:text-xl font-bold text-gray-900 underline underline-offset-4 decoration-2 hover:text-primary hover:decoration-primary cursor-pointer transition"
                >
                    지금 바로 시작하기
                </motion.p>
                </motion.section>        
                {/* Footer (페이지 맨 하단에 붙이기) */}
                <footer className="w-full border-t border-gray-200 px-6 py-24 text-sm text-gray-500">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-4">
                    {/* 좌측 텍스트 */}
                    <div className="flex flex-col gap-1">
                    <p>사업자등록번호 019-96-04130 | 대표 김남후 | 서울 강남구 강남대로94길 86 2층</p>
                    <p>통신판매업 신고번호 제2025-서울강남-5432호 | nyamnyamzupzup@gmail.com</p>
                    </div>
        
                    {/* 우측 링크 (알맹이 없이 껍데기만 제공) */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-400">
                    <span className="hover:underline cursor-pointer">개인정보처리방침</span>
                    <span className="hover:underline cursor-pointer">서비스이용약관</span>
                    <span className="hover:underline cursor-pointer">사업자정보확인</span>
                    </div>
                </div>       
                {/* 하단 카피라이트 */}
                <div className="mt-6 text-center text-gray-400 text-xs">
                    © 2025 MyJarvis. All rights reserved.
                </div>
                </footer>
    </div>
  );
};

export default IntroSchedule;
