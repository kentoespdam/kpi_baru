import { create } from "zustand";
import { ESeverity } from "@commons/interfaces/EStatus";

interface INotifSnackbarStore {
	isOpen: boolean;
	message: string;
	severity: ESeverity;
	duration: number;
	openNotif: (
		message: string,
		severity: ESeverity,
		duration?: number
	) => void;
	closeNotif: () => void;
}

export const useNotifSnackbarStore = create<INotifSnackbarStore>((set) => ({
	isOpen: false,
	message: "",
	severity: ESeverity.ERROR,
	duration: 3000,
	openNotif: (message, severity, duration = 3000) => {
		set((state) => ({
			...state,
			isOpen: true,
			message,
			severity,
			duration,
		}));
	},
	closeNotif: () => {
		set((state) => ({ ...state, isOpen: false }));
	},
}));
