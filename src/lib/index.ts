export const APP_PORT: string = `${process.env.PORT}`;
export const APPWRITE_PROJECT_ID: string = `${process.env.APPWRITE_PROJECT_ID}`;
export const APPWRITE_ENDPOINT: string = `${process.env.APPWRITE_ENDPOINT}`;

// Used by SSR
export const APP_HOSTNAME: string = `${process.env.HOSTNAME}`;
export const APPWRITE_HOSTNAME: string = `${process.env.NEXT_PUBLIC_APPWRITE_HOSTNAME}`; // Must be subdomain of APP_HOSTNAME

export const sessionNames = [
	"a_session_" + APPWRITE_PROJECT_ID.toLowerCase(),
	"a_session_" + APPWRITE_PROJECT_ID.toLowerCase() + "_legacy",
	"a_session_" + APPWRITE_PROJECT_ID.toLowerCase() + "_token",
];
