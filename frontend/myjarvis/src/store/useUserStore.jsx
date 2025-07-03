import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      // 개발 중에는 true로 설정하여 바로 대시보드 확인 가능. 
      isLogined: false, 
      
      // 로그인/로그아웃 함수
      login: () => set({ isLogined: true }),
      logout: () => set({ isLogined: false }),
      
    })
  )
);

export default useUserStore;