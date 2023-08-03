import { BridgePerilakuFilter } from "@myTypes/entity/bridge.perilaku";
import { BaseStore } from "..";
import { create } from "zustand";
import { SearchValueProps } from "@components/commons/table/head/search";
import { AUDIT_STATUS } from "@myTypes/index";

interface BridgePerilakuStore extends BaseStore, BridgePerilakuFilter {}

export const useBridgePerilakuStore = create<BridgePerilakuStore>((set) => ({
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
	perilaku: null,
	level: null,
}));
