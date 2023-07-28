import { create } from "zustand";

interface ViewUploadDialogStore {
	isViewUploadOpen: boolean;
	toggleViewUploadOpen: () => void;
	uploadUraianId: number | null;
	setUploadUraianId: (id: number | null) => void;
}

export const useViewUploadDialogStore = create<ViewUploadDialogStore>(
	(set) => ({
		isViewUploadOpen: false,
		toggleViewUploadOpen: () =>
			set((state) => ({ isViewUploadOpen: !state.isViewUploadOpen })),
		uploadUraianId: null,
		setUploadUraianId: (id) => set(() => ({ uploadUraianId: id })),
	})
);
