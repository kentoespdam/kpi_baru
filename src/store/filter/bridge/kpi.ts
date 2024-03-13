import { SearchValueProps } from "@components/commons/table/head/searchType";
import { BridgeKpiFilter } from "@myTypes/entity/bridge.kpi";
import { AUDIT_STATUS } from "@myTypes/index";
import { create } from "zustand";
import { BaseStore } from "..";

interface BridgeKpiStore extends BaseStore, BridgeKpiFilter {}

export const useBridgeKpiStore = create<BridgeKpiStore>((set) => ({
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
	nipam: null,
	name: null,
	position: null,
	organization: null,
	level: null,
	kpi: null,
}));
