import { create } from "zustand";

interface ViewFileDialogStore {
	isViewOpen: boolean;
	toggleViewOpen: () => void;
	idUraian: number | null;
	setIdUraian: (id: number | null) => void;
}

export const useViewFileDialogStore = create<ViewFileDialogStore>((set) => ({
	isViewOpen: false,
	toggleViewOpen: () => set((state) => ({ isViewOpen: !state.isViewOpen })),
	idUraian: null,
	setIdUraian: (id) => set({ idUraian: id }),
}));
