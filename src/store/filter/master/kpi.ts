import { KpiData } from "@myTypes/entity/kpi";
import { AUDIT_STATUS, Nullable } from "@myTypes/index";
import { create } from "zustand";
import { BaseStore } from "..";
import { SearchValueProps } from "@components/commons/table/head/search";

interface KpiStore extends BaseStore, Nullable<KpiData> {}

export const useKpiStore = create<KpiStore>((set) => ({
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
	organization: null,
	organizationId: null,
	position: null,
	positionId: null,
	profesi: null,
	name: null,
	grade: null,
}));
