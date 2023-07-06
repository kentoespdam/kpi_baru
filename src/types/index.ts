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
const USER_ROLE = {
	STAFF: "staff",
	ADMIN: "admin",
} as const;

export type UserRole = ObjectValues<typeof USER_ROLE>;
