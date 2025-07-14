// src/store/useThemeStore.js
import { create } from "zustand";

const useThemeStore = create((set) => ({
  isDarkMode: false,

  toggleTheme: () =>
    set((state) => {
      const newMode = !state.isDarkMode;
      const root = document.documentElement;

      // html 태그에 dark 클래스 넣기/빼기
      if (newMode) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }

      // 로컬스토리지에 저장 (브라우저 껐다 켜도 유지됨)
      localStorage.setItem("darkMode", newMode ? "on" : "off");

      return { isDarkMode: newMode };
    }),

  initializeTheme: () => {
    const saved = localStorage.getItem("darkMode");
    const shouldBeDark = saved === "on";

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
