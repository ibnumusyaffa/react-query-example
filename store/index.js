import create from "zustand";

const useStore = create((set) => ({
  isAuthenticated: true,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  isMenuExpanded: true,
  setIsMenuExpanded: (value) => set({ isMenuExpanded: value }),

  isReady: false,
  setIsReady: (value) => set({ isReady: value }),
}));

export default useStore;
