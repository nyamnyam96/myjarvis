// src/store/useThemeStore.js
import { create } from "zustand";

const useThemeStore = create((set) => ({
  isDarkMode: false,

  toggleTheme: () =>
    set((state) => {
      const newMode = !state.isDarkMode;
      const root = document.documentElement;

      // 다크 클래스 토글
      if (newMode) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }

      //  localStorage: boolean 값을 문자열로 저장
      localStorage.setItem("darkMode", JSON.stringify(newMode));

      return { isDarkMode: newMode };
    }),

  initializeTheme: () => {
    //  문자열을 boolean으로 파싱
    const saved = localStorage.getItem("darkMode");
    const shouldBeDark = saved === "true"; // 반드시 "true"로 비교해야 함

    const root = document.documentElement;
    if (shouldBeDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    set({ isDarkMode: shouldBeDark });
  },
}));

export default useThemeStore;
