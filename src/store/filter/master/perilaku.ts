import { SearchValueProps } from "@components/commons/table/head/search";
import { PerilakuFilter } from "@myTypes/entity/perilaku";
import { AUDIT_STATUS, Nullable } from "@myTypes/index";
import { create } from "zustand";
import { BaseStore } from "..";

interface PerilakuStore extends BaseStore, Nullable<PerilakuFilter> {}

export const usePerilakuStore = create<PerilakuStore>((set) => ({
	loading: false,
	pageRequest: {
		page: 0,
		size: 10,
	},
	setPageRequest: (pageRequest) => set({ pageRequest }),
	sortRequest: {
		sort: null,
		direction: "asc",
	},
	setSortRequest: (sortRequest) => {
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
	kompetensi: null,
	uraian: null,
	urut: null,
}));
