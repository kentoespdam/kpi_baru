import { TransPerilakuNilai } from "@myTypes/entity/trans.perilaku.nilai";
import { create } from "zustand";

interface ViewFormPerilakuDialogStore {
	isFormPerilakuOpen: boolean;
	toggleFormPerilakuOpen: (perilaku: TransPerilakuNilai | null) => void;
	perilaku: TransPerilakuNilai | null;
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
	}));
