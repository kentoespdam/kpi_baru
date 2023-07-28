import { create } from "zustand";

interface ViewFileDialogStore {
	isViewOpen: boolean;
	toggleViewOpen: () => void;
	idIndikator: number | null;
	setIdIndikator: (id: number | null) => void;
	idUraian: number | null;
	setIdUraian: (id: number | null) => void;
}

export const useViewFileDialogStore = create<ViewFileDialogStore>((set) => ({
	isViewOpen: false,
	toggleViewOpen: () => set((state) => ({ isViewOpen: !state.isViewOpen })),
	idIndikator: null,
	setIdIndikator: (id) => set({ idIndikator: id }),
	idUraian: null,
	setIdUraian: (id) => set({ idUraian: id }),
}));
