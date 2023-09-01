import { AUDIT_STATUS, Nullable } from "@myTypes/index";
import { BaseStore } from "..";
import { SatuanFilter } from "@myTypes/entity/satuan";
import { create } from "zustand";
import { SearchValueProps } from "@components/commons/table/head/search";
import { PageRequest, SortRequest } from "@myTypes/table";

interface SatuanStore extends BaseStore, Nullable<SatuanFilter> {}

export const useSatuanStore = create<SatuanStore>((set) => ({
	pageRequest: {
		page: 0,
		size: 10,
	},
	setPageRequest: (pageRequest: PageRequest) => set({ pageRequest }),
	sortRequest: {
		sort: null,
		direction: "asc",
	},
	setSortRequest: (sortRequest: SortRequest) => set({ sortRequest }),
	searchRequest: {
		field: null,
		value: null,
	},
	setKeyVal: (field: string, value: SearchValueProps) =>
		set({ [field]: value }),
	status: AUDIT_STATUS.ENABLED,
	satuan: null,
}));
