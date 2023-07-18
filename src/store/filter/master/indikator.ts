import { AUDIT_STATUS, Nullable } from "@myTypes/index";
import { BaseStore } from "..";
import { IndikatorFilter } from "@myTypes/entity/indikator";
import { AccordionStore } from "./kpi";
import { create } from "zustand";
import { SearchValueProps } from "@components/commons/table/head/search";
interface IndikatorStore
	extends BaseStore,
		Nullable<IndikatorFilter>,
		AccordionStore {}

export const useIndikatorStore = create<IndikatorStore>((set) => ({
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
	kpiId: null,
	indikator: null,
	expanded: false,
	setExpanded: (expanded) => set({ expanded }),
}));
