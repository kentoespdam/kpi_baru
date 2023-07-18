import { PageRequest, SortRequest } from "@myTypes/table";
import { create } from "zustand";
import { BaseStore } from "..";
import { AUDIT_STATUS, Nullable } from "@myTypes/index";
import { LevelData, LevelFilter } from "@myTypes/entity/level";
import { SearchValueProps } from "@components/commons/table/head/search";

interface LevelStore extends BaseStore, Nullable<LevelFilter> {}

export const useLevelStore = create<LevelStore>((set) => ({
	loading: false,
	pageRequest: {
		page: 0,
		size: 10,
	},
	setPageRequest: (pageRequest: PageRequest) => set({ pageRequest }),
	sortRequest: {
		sort: null,
		direction: "asc",
	},
	setSortRequest: (sortRequest: SortRequest) => {
		set({ sortRequest });
	},
	searchRequest: {
		field: null,
		value: null,
	},
	setKeyVal: (field: string, value: SearchValueProps) => {
		set((state) => ({ ...state, [field]: value }));
	},
	status: AUDIT_STATUS.ENABLED,
	level: null,
}));
