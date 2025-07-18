import React from 'react';
import Header from '../component/common/Header.jsx';
import { motion } from 'framer-motion';
import bgIntro1 from '../assets/bg_intro2.jpg';
import MyJarvisLogo from "../assets/logo-myJarvis.png";
import '../styles/default.css';
import sample4 from '../assets/sample4.jpg';
import sample5 from '../assets/sample5.jpg';
import sample6 from '../assets/sample6.jpg';


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
            회의, 준비보다 더 중요한 건 ‘흐름’입니다.
          </motion.h1>

          {/* 설명 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300"
          >
            MyJarvis는 회의의 준비부터 기록, 후속 조치까지  
            모든 흐름을 자동으로 정리해주는 회의 지원 시스템입니다.  
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
            회의, 정말 잘 관리되고 있을까요?<br />
            한 번의 회의가 흐름 전체를 바꿀 수 있습니다.
          </h2>
            <br />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full">
              {[        
                  { id: 1, text: "준비 부족으로 인한\n비효율적인 회의 시작" },
                  { id: 2, text: "중요 논의사항이 추후\n흐지부지되는 문제" },
                  { id: 3, text: "회의록 누락 및\n공유·피드백 체계 부재" },
                  { id: 4, text: "회의 맥락 단절로 인한\n중복 논의 반복" },     
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
          <div className="absolute top-[10%] left-[30%] transform -translate-x-1/2 z-10 text-center w-full max-w-[1200px] px-6 flex flex-col items-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-snug"
            >
            회의의 시작부터 결과까지, 하나의 흐름으로.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-200"
            >
            계획 - 회의 - 기록 - 후속 조치까지 전 과정을 MyJarvis와 함께.
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
                  src={sample4}
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
                <h3 className="text-4xl font-bold text-gray-900 mb-6">회의 내용 요약 및 기록</h3>
                <p className="text-xl text-gray-500 font-medium tracking-wide leading-relaxed">
                  회의 제목, 참석자, 논의 주제 및 주요 결정사항을<br />
                  손쉽게 정리할 수 있도록 회의 요약 양식을 제공합니다.<br />
                  회의록은 히스토리로 자동 저장됩니다.
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
                  src={sample5}
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
                <h3 className="text-4xl font-bold text-gray-900 mb-6">후속 작업 연동</h3>
                <p className="text-xl text-gray-500 font-medium tracking-wide leading-relaxed">
                  회의 중 결정된 업무는 즉시 작업으로 생성 가능하며,<br />
                  관련 일정 및 계약 흐름과 유기적으로 연결됩니다.<br />
                  업무 전환이 매끄럽고 누락 없이 이어집니다.
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
                  src={sample6}
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
                <h3 className="text-4xl font-bold text-gray-900 mb-6">회의 이력 통합 관리</h3>
                <p className="text-xl text-gray-500 font-medium tracking-wide leading-relaxed">
                  고객사·프로젝트별 회의 내용을 일목요연하게 확인하고,<br />
                  과거 논의 흐름을 바탕으로 협업의 맥락을 이해할 수 있습니다.<br />
                  회의 히스토리는 검색 및 정렬이 가능합니다.
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
              불필요한 회의는 줄이고, 필요한 논의는 선명하게. <br className="hidden md:inline" />
              회의의 목적과 결과가 명확해지는 경험을 제공하는
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
