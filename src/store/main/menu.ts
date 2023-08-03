import { create } from "zustand";

interface MenuStore {
	isMenuOpen: boolean;
	toggleDrawer: () => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
	isMenuOpen: false,
	toggleDrawer: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));

interface ProfileStore {
	anchorEl: null | HTMLElement;
	setAnchorEl: (anchorEl: null | HTMLElement) => void;
	isOpen: boolean;
	toggleProfileMenu: () => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
	anchorEl: null,
	setAnchorEl: (anchorEl) => set({ anchorEl }),
	isOpen: false,
	toggleProfileMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}));
