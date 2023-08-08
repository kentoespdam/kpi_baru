import { create } from "zustand";

interface ViewFormKinerjaDialogStore {
	isFormKinerjaOpen: boolean;
	toggleFormKinerjaOpen: () => void;
	staffNipam: string | null;
	setStaffNipam: (nipam: string | null) => void;
	idKpi: number | null;
	setIdKpi: (id: number | null) => void;
	idUraian: number | null;
	setIdUraian: (id: number | null) => void;
	reset: () => void;
}

export const useViewFormKinerjaDialogStore = create<ViewFormKinerjaDialogStore>((set) => ({
	isFormKinerjaOpen: false,
	toggleFormKinerjaOpen: () => set((state) => ({ isFormKinerjaOpen: !state.isFormKinerjaOpen })),
	staffNipam: null,
	setStaffNipam: (nipam) => set({ staffNipam: nipam }),
	idKpi: null,
	setIdKpi: (id) => set({ idKpi: id }),
	idUraian: null,
	setIdUraian: (id) => set({ idUraian: id }),
	reset: () =>
		set({
			staffNipam: null,
			idKpi: null,
			idUraian: null,
		}),
}));
