import { create } from "zustand";

export const useExperienceStore = create((set) => ({
  isExperienceReady: false,

  setIsExperienceReady: () =>
    set({
      isExperienceReady: true,
    }),
}));
