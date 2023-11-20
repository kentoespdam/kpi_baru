import { create } from "zustand";

interface ViewFileDialogStore {
	isViewOpen: boolean;
	toggleViewOpen: () => void;
	idUraian: number | null;
	setIdUraian: (id: number | null) => void;
	nipam: string | null;
	setNipam: (nipam: string | null) => void;
	kpiId: number | null;
	setKpiId: (id: number | null) => void;
}

export const useViewFileDialogStore = create<ViewFileDialogStore>((set) => ({
	isViewOpen: false,
	toggleViewOpen: () => set((state) => ({ isViewOpen: !state.isViewOpen })),
	idUraian: null,
	setIdUraian: (id) => set({ idUraian: id }),
	nipam: null,
	setNipam: (nipam) => set({ nipam: nipam }),
	kpiId: null,
	setKpiId: (id) => set({ kpiId: id }),
}));
