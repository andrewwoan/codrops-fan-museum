// experienceStore.js
import { create } from "zustand";

export const useExperienceStore = create((set) => ({
  isExperienceReady: false,
  isExperienceLoading: true,
  loadedChunks: 0,
  totalChunks: 4,

  setIsExperienceReady: () => set({ isExperienceReady: true }),
  setIsExperienceLoading: (isLoading) =>
    set({ isExperienceLoading: isLoading }),
  incrementLoadedChunks: () =>
    set((state) => ({ loadedChunks: state.loadedChunks + 1 })),
}));
