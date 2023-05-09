import { create } from "zustand";

interface IFormDialogStore {
	isDialogOpen: boolean;
	toggleDialog: () => void;
}

export const useFormDialogStore = create<IFormDialogStore>((set) => ({
	isDialogOpen: false,
	toggleDialog: () =>
		set((state) => ({ ...state, isDialogOpen: !state.isDialogOpen })),
}));
