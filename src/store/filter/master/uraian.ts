import { UraianFilter } from "@myTypes/entity/uraian";
import { AUDIT_STATUS, Nullable } from "@myTypes/index";
import { BaseStore } from "..";
import { AccordionStore } from "./kpi";
import { create } from "zustand";
import { SearchValueProps } from "@components/commons/table/head/search";

interface UraianStore
	extends BaseStore,
		Nullable<UraianFilter>,
		AccordionStore {}

export const useUraianStore = create<UraianStore>((set) => ({
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
	indikatorId: null,
	uraian: null,
	kpiId: null,
	profesiId: null,
	levelId: null,
	expanded: false,
	setExpanded: (expanded) => set({ expanded }),
}));
