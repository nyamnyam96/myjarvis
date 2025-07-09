import { useNavigate } from "react-router-dom";
import Header from "../component/common/Header";
import heroImage from "../assets/hero-bg.jpg";
import FeatureImg from "../assets/feature-illustration.jpg";
import Badge from "../components/common/Badge";
import BgGradient from '../assets/bg-gradient.png';
import BgGradient1 from '../assets/bg-gradient1.png';
import BgGradient2 from '../assets/bg-gradient2.png';
import BgGradient3 from '../assets/bg-gradient3.png';
import { motion } from "framer-motion";
import MyJarvisLogo from "../assets/logo-myJarvis.png";

function Home() {
  return (
    <div className="relative">
      {/* GNB/Header 영역 */}
      <Header />

      {/*  Hero Section: 배경 이미지와 메인 카피 */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* 반투명 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero 콘텐츠 */}
        <div className="relative z-10 text-center px-6">
         <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }} h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            당신의 비즈니스, Jarvis가 책임집니다.
          </motion.h1>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl mb-8">
            1인 사업가를 위한 스마트 ERP 비서
          </motion.p>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="px-8 py-3 bg-white/20 border border-white text-white font-medium rounded-lg backdrop-blur hover:bg-white/30 transition">
            지금 바로 시작하기
          </motion.button>
        </div>
      </motion.section>

        {/*  기능 소개 Section: 문구 + 일러스트 */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 }
        }}
        className="w full min-h-screen bg-white py-24 px-6"> {/*  간격 여유 확보 */}
        {/* 중앙 정렬된 문구 */}
        <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            “What professionals use<br />when going solo.”
            </h2>
        </div>
        {/* 텍스트와 이미지 나란히 배치 */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
            {/*  좌측 텍스트 설명 */}
            <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:w-1/2 text-gray-600 text-base md:text-lg leading-relaxed font-bold">
            <p className="mb-4">
                작은 조직일수록 시스템은 더욱 필요합니다.<br />
                수기로 남기던 기록은 이제 미래를 위한 자산이 됩니다.
            </p>
            <p className="mb-4">
                계약, 회의, 결제까지 하나의 흐름으로 자동 관리됩니다.<br />
                고객 응대, 일정 관리, 이메일까지 실수 없이 처리하세요.<br />
                반복적인 행정 업무는 줄이고, 전략에 집중하세요.
            </p>
            <p className="mt-6 text-gray-900 font-extrabold">
                "혼자 일할 때 전문가가 선택하는 시스템"<br />
                <span className="text-primary">MYJARVIS</span>는,
                그런 당신을 위한 실무 파트너입니다.
            </p>
            </motion.div>
            {/*  우측 일러스트 이미지 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:w-1/2">
            <img
                src={FeatureImg}
                alt="일하는 전문가 일러스트"
                className="w-full max-w-sm mx-auto rounded-lg"
            />
          </motion.div>
        </div>
      </motion.section>

        <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.8 }}
        className="w-full min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-24"
        style={{ backgroundImage: `url(${BgGradient})` }}
        >
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full max-w-6xl bg-white rounded-[2rem] shadow-xl flex flex-col md:flex-row p-12 gap-10 relative"
        >
            {/* 좌측 텍스트 영역 */}
            <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col justify-start"
            >
            <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-extrabold text-gray-900 mb-3 whitespace-nowrap"
            >
                일정과 작업을 모두 캘린더에.
            </motion.h2>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm max-w-lg"
            >
                <p className="text-lg text-gray-500 font-semibold leading-relaxed">
                계약과 회의에서 생성된 일정이 자동 등록되어<br />
                개인 일정과 함께 놓치는 일 없이 실무를 연결합니다.
                </p>
            </motion.div>
            </motion.div>

            {/* 우측 기능 이미지 영역 */}
            <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 flex items-center justify-center"
            >
            <div className="w-full h-[380px] max-w-lg bg-white border border-gray-200 rounded-2xl flex items-center justify-center text-gray-800 text-lg font-medium shadow-md">
                실제 일정관리 기능 화면
            </div>
            </motion.div>

            {/*  일정관리 태그: 카드 하단 왼쪽 고정 */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="absolute bottom-10 left-12 flex flex-wrap gap-2"
            >
            <Badge text="계약 기반 일정" type="gray" />
            <Badge text="자동 캘린더 등록" type="gray" />
            <Badge text="작업 연동" type="gray" />
            <Badge text="리마인더 알림" type="gray" />
            </motion.div>
        </motion.div>
        </motion.section>

        <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.8 }}
        className="w-full min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-24"
        style={{ backgroundImage: `url(${BgGradient1})` }}
        >
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full max-w-6xl bg-white rounded-[2rem] shadow-xl flex flex-col md:flex-row p-12 gap-10 relative"
        >
            {/* 좌측 텍스트 영역 */}
            <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col justify-start"
            >
            <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-extrabold text-gray-900 mb-3 whitespace-nowrap"
            >
                계약의 생성부터 체결까지, 한 번에.
            </motion.h2>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm max-w-lg"
            >
                <p className="text-lg text-gray-500 font-semibold leading-relaxed">
                표준계약 생성부터 체결, 이력 관리까지 자동화되어<br />
                안정적인 진행 및 하나의 흐름으로 관리합니다.
                </p>
            </motion.div>
            </motion.div>

            {/* 우측 기능 이미지 영역 */}
            <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 flex items-center justify-center"
            >
            <div className="w-full h-[380px] max-w-lg bg-white border border-gray-200 rounded-2xl flex items-center justify-center text-gray-800 text-lg font-medium shadow-md">
                실제 계약관리 기능 화면
            </div>
            </motion.div>

            {/* 계약관리 태그: 카드 하단 왼쪽 고정 */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="absolute bottom-10 left-12 flex flex-wrap gap-2"
            >
            <Badge text="표준계약서 관리" type="gray" />
            <Badge text="전자서명 연동" type="gray" />
            <Badge text="계약 이력 추적" type="gray" />
            <Badge text="계약서 통합보관" type="gray" />
            </motion.div>
        </motion.div>
        </motion.section>

        {/* 회의관리 Section */}
        <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.8 }}
        className="w-full min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-24"
        style={{ backgroundImage: `url(${BgGradient2})` }}
        >
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full max-w-6xl bg-white rounded-[2rem] shadow-xl flex flex-col md:flex-row p-12 gap-10 relative"
        >
            {/* 좌측 텍스트 영역 */}
            <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col justify-start"
            >
            <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-extrabold text-gray-900 mb-3 whitespace-nowrap"
            >
                AI와 함께 모든 업무를 회의로.
            </motion.h2>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm max-w-lg"
            >
                <p className="text-lg text-gray-500 font-semibold leading-relaxed">
                계약, 작업 항목과 연동하여 회의록을 자동 태깅 및 구조화하고,<br />
                회의 결정사항을 AI로 요약하고 공유합니다.
                </p>
            </motion.div>
            </motion.div>

            {/* 우측 기능 이미지 영역 */}
            <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 flex items-center justify-center"
            >
            <div className="w-full h-[380px] max-w-lg bg-white border border-gray-200 rounded-2xl flex items-center justify-center text-gray-800 text-lg font-medium shadow-md">
                실제 회의관리 기능 화면
            </div>
            </motion.div>

            {/* 회의관리 태그: 카드 하단 왼쪽 고정 */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="absolute bottom-10 left-12 flex flex-wrap gap-2"
            >
            <Badge text="회의록 자동 태깅" type="gray" />
            <Badge text="AI 회의 요약" type="gray" />
            <Badge text="작업/계약 연동" type="gray" />
            <Badge text="회의 결정사항 공유" type="gray" />
            </motion.div>
        </motion.div>
        </motion.section>


        {/* 결제관리 Section */}
        <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.8 }}
        className="w-full min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-24"
        style={{ backgroundImage: `url(${BgGradient3})` }}
        >
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full max-w-6xl bg-white rounded-[2rem] shadow-xl flex flex-col md:flex-row p-12 gap-10 relative"
        >
            {/* 좌측 텍스트 영역 */}
            <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col justify-start"
            >
            <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-extrabold text-gray-900 mb-3 whitespace-nowrap"
            >
                청구부터 결제까지 빈틈없게.
            </motion.h2>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm max-w-lg"
            >
                <p className="text-lg text-gray-500 font-semibold leading-relaxed">
                청구서 생성 및 결제 내역서 발급 일련의 과정이 전부 자동화되고,<br />
                계약 기반을 바탕으로 수납 현황을 통합 관리합니다.
                </p>
            </motion.div>
            </motion.div>

            {/* 우측 기능 이미지 영역 */}
            <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 flex items-center justify-center"
            >
            <div className="w-full h-[380px] max-w-lg bg-white border border-gray-200 rounded-2xl flex items-center justify-center text-gray-800 text-lg font-medium shadow-md">
                실제 결제관리 기능 화면
            </div>
            </motion.div>

            {/* 결제관리 태그: 카드 하단 왼쪽 고정 */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="absolute bottom-10 left-12 flex flex-wrap gap-2"
            >
            <Badge text="청구서 자동 생성" type="gray" />
            <Badge text="결제내역서 발급" type="gray" />
            <Badge text="계약 기반 수납관리" type="gray" />
            <Badge text="통합 재무 관리" type="gray" />
            </motion.div>
        </motion.div>
        </motion.section>

        <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full min-h-screen bg-white flex flex-col items-center justify-center px-6 py-24"
        >
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
        <footer className="w-full border-t border-gray-200 px-6 py-8 text-sm text-gray-500">
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
}

export default Home;
