export const APP_PORT: string = `${process.env.PORT}`;
export const APP_PROTOCOL: string = `${process.env.PROTOCOL}`;
export const APPWRITE_API_KEY = `${process.env.APPWRITE_API_KEY}`;
export const APPWRITE_PROJECT_ID: string = `${process.env.APPWRITE_PROJECT_ID}`;
export const APPWRITE_ENDPOINT: string = `${process.env.APPWRITE_ENDPOINT}`;

// Used by SSR
export const APP_HOSTNAME: string = `${process.env.APP_HOSTNAME}`;
export const APPWRITE_HOSTNAME: string = `${process.env.NEXT_PUBLIC_APPWRITE_HOSTNAME}`; // Must be subdomain of APP_HOSTNAME
export const APP_URL =
	APP_PORT === "3000"
		? `${APP_PROTOCOL}://${APP_HOSTNAME}:${APP_PORT}`
		: `${APP_PROTOCOL}://${APP_HOSTNAME}`;

export const sessionNames = [
	"a_session_" + APPWRITE_PROJECT_ID.toLowerCase(),
	"a_session_" + APPWRITE_PROJECT_ID.toLowerCase() + "_legacy",
	"a_session_" + APPWRITE_PROJECT_ID.toLowerCase() + "_token",
];

export const defaultRoles: string[] = ["USER"];
export const DEFAULT_PASSWORD = `${process.env.DEFAULT_PASSWORD}`;
export const DEFAULT_MAIL_DOMAIN = `${process.env.DEFAULT_MAIL_DOMAIN}`;
