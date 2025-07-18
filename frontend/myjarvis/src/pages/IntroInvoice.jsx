import React from 'react';
import Header from '../component/common/Header.jsx';
import { motion } from 'framer-motion';
import bgIntro1 from '../assets/bg_intro4.jpg';
import MyJarvisLogo from "../assets/logo-myJarvis.png";
import '../styles/default.css';
import sample10 from '../assets/sample10.png';
import sample11 from '../assets/sample11.png';
import sample12 from '../assets/sample12.png';

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
          시간은 아끼고, 복잡한 정산은 확실하게.
          </motion.h1>

          {/* 설명 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300"
          >
            MyJarvis는 계약 정보를 기반으로, 청구서 발송부터 결제 확인까지의 전 과정을 직관적으로 연결합니다.
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
            청구·결제, 제대로 관리되고 있나요?<br />
            신뢰를 잃는 일은 생각보다 사소한 데서 시작됩니다.
          </h2>
            <br />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full">
              {[        
                { id: 1, text: "계약과 분리된\n청구 내역의 단절" },
                { id: 2, text: "누락되기 쉬운\n청구 주기와 금액" },
                { id: 3, text: "PDF 청구서 작성\n반복 작업의 피로" },
                { id: 4, text: "결제 이력 관리의\n수기 기록 한계" },   
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
          <div className="absolute top-[17%] left-[20%] transform -translate-x-1/2 z-10 text-center w-full max-w-[1200px] px-6 flex flex-col items-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-snug"
            >
            청구는 정확하게, 결제는 놓치지 않게.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-200"
            >
            MyJarvis는 청구서 발행부터 결제 상태 추적까지 일련의 과정을 흐름으로 연결합니다.
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
                  src={sample10}
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
                <h3 className="text-4xl font-bold text-gray-900 mb-6">자동 청구서 생성 및 발송</h3>
                <p className="text-xl text-gray-500 font-medium tracking-wide leading-relaxed">
                  계약 내용과 일정 정보를 기반으로 청구서를 자동 생성합니다.<br />
                  PDF로 변환된 청구서는 이메일로 바로 전송 가능하며,<br />
                  발송 내역은 시스템 내 히스토리로 기록됩니다.
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
                  src={sample11}
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
                <h3 className="text-4xl font-bold text-gray-900 mb-6">수납 상태 추적 및 리마인드</h3>
                <p className="text-xl text-gray-500 font-medium tracking-wide leading-relaxed">
                  결제 예정일, 수납 여부 등 주요 정보를 한 눈에 확인할 수 있습니다.<br />
                  미결제 내역에 대한 자동 알림 기능도 제공되어,<br />
                  누락 없는 수금과 현금 흐름 관리를 지원합니다.
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
                  src={sample12}
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
                <h3 className="text-4xl font-bold text-gray-900 mb-6">고객사별 청구 이력 관리</h3>
                <p className="text-xl text-gray-500 font-medium tracking-wide leading-relaxed">
                  각 고객사별로 청구/결제 내역을 연동하여 관리할 수 있습니다.<br />
                  계약서, 회의 이력과 연결되어 있어 흐름이 끊기지 않으며,<br />
                  장기 고객과의 신뢰 기반 정산 관리가 수월해집니다.
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
              번거로운 계산은 시스템에 맡기고, 일에 집중하세요. <br className="hidden md:inline" />
              청구서 생성부터 이력 관리까지 당신을 서포트하기 위해
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
