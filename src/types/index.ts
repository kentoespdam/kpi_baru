export type ChildrenProps = {
	children: React.ReactNode;
};

export type ObjectValues<T> = T[keyof T];

export type Nullable<T> = { [K in keyof T]: T[K] | null };

export type DefaultNull<T> = { [K in keyof T]: T[K] | null };

export function defaultNull<T>(args: T): DefaultNull<T> {
	return args;
}

export type NonNullable<T> = { [K in keyof T]: T[K] };

export type DefaultFalse<T> = { [K in keyof T]: T[K] | false };

export function isNumber(args: any): args is Number {
	return typeof args === "number";
}

export function isString(args: any): args is String {
	return typeof args === "string";
}
export function onlyBoolean(arg: unknown): arg is boolean {
	return !!arg && typeof arg === "boolean";
}

export function isObject(
	args: Nullable<Record<string, unknown>>
): args is Nullable<Record<string, unknown>> {
	return typeof args === "object";
}

export function typeCheck(args: "number" | "string" | "boolean") {
	return typeof args === args;
}
export const USER_ROLE = {
	USER: "USER",
	ADMIN: "ADMIN",
} as const;

export type UserRole = ObjectValues<typeof USER_ROLE>;

export const AUDIT_STATUS = {
	ENABLED: "Enabled",
	DISABLED: "Disabled",
	DELETED: "Deleted",
} as const;

export type AuditStatus = ObjectValues<typeof AUDIT_STATUS>;

export interface BaseId {
	id: number;
	status: AuditStatus;
}

export function isBaseId(args: any): args is BaseId {
	return (
		typeof args === "object" &&
		typeof args.id === "number" &&
		typeof args.status === "string"
	);
}

export interface Audit {
	createdAt: Date;
	createdBy: string;
	updatedAt: Date;
	updatedBy: string;
}

export const EMP_STATUS = {
	Active: "Active",
	Inactive: "Inactive",
	Deleted: "Deleted",
};

export type EmpStatus = ObjectValues<typeof EMP_STATUS>;

export interface Sort {
	sorted: boolean;
	unsorted: boolean;
	empty: boolean;
}

export interface Pageable {
	sort: Sort;
	offset: number;
	pageSize: number;
	pageNumber: number;
	paged: boolean;
	unpaged: boolean;
}

export interface Pages<Data> {
	content: Data[];
	empty: boolean;
	first: boolean;
	last: boolean;
	number: number;
	numberOfElements: number;
	pageable: Pageable;
	size: number;
	sort: Sort;
	totalElements: number;
	totalPages: number;
}

export interface PageRequest {
	page: number;
	size: number;
	sort: string | null;
	direction: "asc" | "desc";
}

export interface ApiResponse<Data> {
	status: string;
	code: number;
	timestamp: Date;
	message: string;
	error?: string;
	data: Data;
}

export const roles: string[] = ["ADMIN", "USER"];

export interface AutoCompleteProps<Entity> {
	search: Entity | null;
	setSearchValue: (value: Entity | null) => void;
	required?: boolean;
	variant?: "standard" | "filled" | "outlined";
	size?: "small" | "medium";
}
