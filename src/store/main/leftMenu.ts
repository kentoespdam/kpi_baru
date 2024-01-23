import { create } from "zustand";

interface MenuStore {
	isMenuOpen: boolean;
	setMenuOpen: () => void;
}

export const useMenuStore = create<MenuStore>((set, get) => ({
	isMenuOpen: false,
	setMenuOpen: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));
