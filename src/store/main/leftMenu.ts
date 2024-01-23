import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface MenuStore {
	isMenuOpen: boolean;
	setMenuOpen: () => void;
}

export const useMenuStore = create(
	devtools(
		persist<MenuStore>(
			(set, get) => ({
				isMenuOpen: false,
				setMenuOpen: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
			}),
			{
				name: "menu-store",
				storage: createJSONStorage(() => sessionStorage),
			},
		),
	),
);
