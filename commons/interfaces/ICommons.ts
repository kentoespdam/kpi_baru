export enum EAuditStatus {
	Enabled = "Enabled",
	Disabled = "Disabled",
	Deleted = "Deleted",
}

export interface IBaseId {
	id: number;
	status: EAuditStatus;
}

export interface IAudit {
	createdAt: Date;
	createdBy: string;
	updatedAt: Date;
	updatedBy: string;
}

export interface ISort {
	empty: boolean;
	sorted: boolean;
	unsorted: boolean;
}

export interface IPageable {
	sort: ISort;
	offset: number;
	pageNumber: number;
	pageSize: number;
	paged: boolean;
	unpaged: boolean;
}

export interface IPages<T> {
	content: T[];
	pageable: IPageable;
	totalPages: number;
	totalElements: number;
	last: boolean;
	size: number;
	number: number;
	sort: ISort;
	numberOfElements: number;
	first: boolean;
	empty: boolean;
}

export interface IPageRequest {
	page: number;
	size: number;
	sort?: string;
	direction?: string;
}

// Result Api Response
export interface IApiResponse<T> {
	status: string;
	code: number;
	timestamp: Date;
	message: string;
	error?: string;
	data: T;
}

// Select Type for Filter Dialog
export type SelectType = {
	id: string;
	label: string;
	type: string;
	value?: unknown;
};

export interface ActionButtonProps<T> {
	value: T;
	props?: any;
}
