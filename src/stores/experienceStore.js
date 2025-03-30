// experienceStore.js
import { create } from "zustand";

export const useExperienceStore = create((set) => ({
  isExperienceReady: false,
  isExperienceLoading: true,
  isAllContentLoaded: false,

  setIsExperienceReady: () => set({ isExperienceReady: true }),
  setIsExperienceLoading: (isLoading) =>
    set({ isExperienceLoading: isLoading }),
  setAllContentLoaded: () => set({ isAllContentLoaded: true }),
}));
