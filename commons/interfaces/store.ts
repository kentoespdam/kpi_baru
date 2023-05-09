export interface IFormStore<T> {
	form?: T;
	setForm: (v: Partial<T>) => void;
	action: "create" | "update";
	setAction: (v: "create" | "update") => void;
}

export interface IPageRequestStore<T> {
	pageRequest: T;
	setPageRequest: (v: T) => void;
}

export interface IPagesStore<T> {
	pages?: T;
	setPages: (v?: T) => void;
	curPage: number;
	setCurPage: (v: number) => void;
}
