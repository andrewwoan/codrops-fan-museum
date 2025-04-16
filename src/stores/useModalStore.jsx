import { create } from "zustand";

export const useModalStore = create((set) => ({
  isModalOpen: false,
  modalID: "",

  setModalID: (id) =>
    set({
      modalID: id,
    }),

  openModal: () =>
    set({
      isModalOpen: true,
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
    }),
}));
