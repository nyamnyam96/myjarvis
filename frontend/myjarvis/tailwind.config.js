/** @type {import('tailwindcss').Config} */

export default {
  //  Tailwind가 사용할 파일 경로 지정 (모든 컴포넌트/페이지 폴더 포함)
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
    safelist: [
    'content-wrap', // purge 대상에서 보호
  ],
  
  darkMode : 'class', // 다크모드 구현

  theme: {
    extend: {
      //  공통 색상 정의 (default.css와 통일되도록 설정)
      colors: {
        primary: '#4F46E5',   // 버튼 등 주요 강조 색
        secondary: '#6366F1', // 보조 강조 색
        accent: '#22D3EE',    // 포인트 색상 (예: 뱃지 등)
        muted: '#94A3B8',     // 보조 텍스트나 비활성용
      },

      //  공통 폰트 설정
      fontFamily: {
        sans: ['"Pretendard"', 'sans-serif'], // default.css와 일치
      },

      //  추가적으로 여백, 그림자 등을 확장 가능
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
