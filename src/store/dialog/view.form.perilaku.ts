import { TransPerilakuNilai } from "@myTypes/entity/trans.perilaku.nilai";
import { create } from "zustand";

interface ViewFormPerilakuDialogStore {
	isFormPerilakuOpen: boolean;
	toggleFormPerilakuOpen: (perilaku: TransPerilakuNilai | null) => void;
	perilaku: TransPerilakuNilai | null;
	nipam: string | null;
	setNipam: (nipam: string | null) => void;
	levelId: number | null;
	setLevelId: (levelId: number | null) => void;
}

export const useViewFormPerilakuDialogStore =
	create<ViewFormPerilakuDialogStore>((set) => ({
		isFormPerilakuOpen: false,
		toggleFormPerilakuOpen: (perilaku) =>
			set((state) =>
				state.isFormPerilakuOpen
					? { isFormPerilakuOpen: false, perilaku: null }
					: {
							isFormPerilakuOpen: true,
							perilaku: perilaku,
					  }
			),
		perilaku: null,
		nipam: null,
		setNipam: (nipam) => set({ nipam }),
		levelId: null,
		setLevelId: (levelId) => set({ levelId }),
	}));
