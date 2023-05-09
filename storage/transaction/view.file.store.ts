import { create } from "zustand";

interface IViewFileStore {
	isViewOpen: boolean;
	fileUrl?: string;
	toggleView: (fileUrl?: string) => void;
}

export const useViewFileStore = create<IViewFileStore>((set) => ({
	isViewOpen: false,
	toggleView: (fileUrl?) =>
		set((state) => ({
			...state,
			isViewOpen: !state.isViewOpen,
			fileUrl: fileUrl,
		})),
}));
