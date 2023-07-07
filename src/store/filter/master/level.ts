import { SortRequest } from "@myTypes/filter";
import { create } from "zustand";

interface LevelStore {
	sortRequest: SortRequest;
	setSortRequest: (sortRequest: SortRequest) => void;
}

export const useLevelStore = create<LevelStore>((set) => ({
	sortRequest: {
		sort: null,
		direction: "asc",
	},
	setSortRequest: (sortRequest: SortRequest) => {
		set({ sortRequest });
	},
}));
