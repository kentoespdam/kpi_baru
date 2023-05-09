import { createTheme, Theme } from "@mui/material/styles";
import { create } from "zustand";

export const theme = createTheme({
	// palette: {
	// 	mode: "dark",
	// },
	// components: {
	// 	MuiContainer: {
	// 		styleOverrides: {
	// 			root: {
	// 				background: "rgb(2,0,36)",
	// 			},
	// 		},
	// 	},
	// 	MuiPaper: {
	// 		styleOverrides: {
	// 			root: {
	// 				background:
	// 					"linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(18,6,36,1) 0%, rgba(7,1,17,1) 0%)",
	// 			},
	// 		},
	// 	},
	// },
});

interface ITemplateStore {
	theme: Theme;
	elv: number;
	isMenuOpen: boolean;
	toggleMenu: () => void;
}

export const useTemplateStore = create<ITemplateStore>((set) => ({
	theme: theme,
	elv: 0,
	isMenuOpen: false,
	toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));
