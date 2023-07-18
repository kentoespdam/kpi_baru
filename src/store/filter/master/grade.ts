import { GradeData, GradeFilter } from "@myTypes/entity/grade";
import { AUDIT_STATUS, Nullable } from "@myTypes/index";
import { create } from "zustand";
import { BaseStore } from "..";

interface GradeStore extends BaseStore, Nullable<GradeFilter> {}

export const useGradeStore = create<GradeStore>((set) => ({
	loading: false,
	setLoading: (loading) => set({ loading }),
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
	setKeyVal: (field: string, value: string | number | null) => {
		set((state) => ({ ...state, [field]: value }));
	},
	status: AUDIT_STATUS.ENABLED,
	grade: null,
	tukin: null,
	level: null,
}));
