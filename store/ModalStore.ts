import { create } from 'zustand'

interface ModalStoreInterface {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalStoreInterface>()((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}))