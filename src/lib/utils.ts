import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const baseAuthUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}`;
export const authUrl = `${baseAuthUrl}/account/sessions/email`;
export const projectId = `${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
export const appwriteKey = `${process.env.NEXT_PUBLIC_APPWRITE_API_KEY}`;

export const localAppUrl = `${process.env.PROTOCOL}://${process.env.APP_HOSTNAME}:${process.env.PORT}`;

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
