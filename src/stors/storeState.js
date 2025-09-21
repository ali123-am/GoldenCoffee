import { create } from "zustand";
const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const theme = localStorage.getItem("theme");
    return theme === "dark";
  }
  return false;
};

const useStoreState = create((set) => ({
  isDark: getInitialTheme(),
  changeTheme: () =>
    set((state) => {
      const newTheme = !state.isDark;

      const root = document.documentElement;
      if (newTheme) {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }

      return { isDark: newTheme };
    }),
}));

export default useStoreState;
