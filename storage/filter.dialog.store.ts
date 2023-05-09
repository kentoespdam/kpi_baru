import { SelectType } from "@commons/interfaces/ICommons";
import { create } from "zustand";

interface IFilterDialog {
	title: string;
	isOpen: boolean;
	filterOptions?: SelectType[];
	filterKey?: string;
	filterValue?: unknown;
	keyValSearch?: [];
	setTitle: (v: string) => void;
	toggleOpen: () => void;
	setFilterOptions: (v: SelectType[]) => void;
	setFilterKey: (v: string) => void;
	setFilterValue: (v: unknown) => void;
}

export const useFilterDialogStore = create<IFilterDialog>((set) => ({
	title: "",
	isOpen: false,
	setTitle: (value) => set((state) => ({ ...state, title: value })),
	toggleOpen: () => set((state) => ({ ...state, isOpen: !state.isOpen })),
	setFilterOptions: (value) =>
		set((state) => ({ ...state, filterOptions: value })),
	setFilterKey: (value) => set((state) => ({ ...state, filterKey: value })),
	setFilterValue: (value) =>
		set((state) => ({ ...state, filterValue: value })),
}));
