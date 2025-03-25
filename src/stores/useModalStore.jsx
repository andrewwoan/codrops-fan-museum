import { create } from "zustand";

export const useModalStore = create((set) => ({
  isModalOpen: false,
  modalTitle: "",
  modalType: "",

  openModal: (title, content, type) =>
    set({
      isModalOpen: true,
      modalTitle: title,
      modalType: type,
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
      modalTitle: "",
      modalType: "",
    }),
}));
