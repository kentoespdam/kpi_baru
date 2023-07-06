import { create } from "zustand";

interface MenuStore {
	isMenuOpen: boolean;
	toggleMenu: () => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
	isMenuOpen: false,
	toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));
