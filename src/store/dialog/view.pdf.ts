import { create } from "zustand";

interface ViewPdfDialogStore {
	isViewPdfOpen: boolean;
	toggleViewPdfOpen: () => void;
	fileId: number | null;
	setFileId: (id: number | null) => void;
}

export const useViewPdfDialogStore = create<ViewPdfDialogStore>((set) => ({
	isViewPdfOpen: false,
	toggleViewPdfOpen: () =>
		set((state) => ({ isViewPdfOpen: !state.isViewPdfOpen })),
	fileId: null,
	setFileId: (id) => set(() => ({ fileId: id })),
}));
