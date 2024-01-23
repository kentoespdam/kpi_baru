export type ObjectValues<T> = T[keyof T];

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

interface AccountPref {
	roles?: UserRole[];
}

export interface SessionUser {
	$id: string;
	userId: string;
	name: string;
	email: string;
	prefs: AccountPref;
}