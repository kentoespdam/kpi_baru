import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import {
	APPWRITE_HOSTNAME,
	APPWRITE_PROJECT_ID,
	APP_HOSTNAME,
	sessionNames,
} from "src/lib";

export const getSessionCookie = (cookies: RequestCookies) => {
	const sess =
		cookies.get(sessionNames[0])?.value ||
		cookies.get(sessionNames[1])?.value;
	return sess;
};

export const appwriteHeader = (
	sessCookie: string | RequestCookies,
	token?: string
) => {
	let header;
	switch (typeof sessCookie) {
		case "object":
			const xfallback =
				sessCookie.get(sessionNames[0])?.value ||
				sessCookie.get(sessionNames[1])?.value ||
				"";
			header = {
				"X-Appwrite-Project": APPWRITE_PROJECT_ID,
				"Content-Type": "application/json",
				"Cookie": sessCookie.toString(),
				"X-Fallback-Cookies": xfallback,
			};
			break;
		default:
			header = {
				"X-Appwrite-Project": APPWRITE_PROJECT_ID,
				"Content-Type": "application/json",
				"Cookie": `${sessionNames[0]}=${sessCookie}`,
				"X-Fallback-Cookies": sessCookie,
			};
			break;
	}

	if (token) return { ...header, "X-Appwrite-JWT": token };
	return header;
};

export const newSetCookies = (cookieString: string) => {
	const newHostname =
		APP_HOSTNAME === "localhost" ? APP_HOSTNAME : "." + APP_HOSTNAME;

	let cookie = cookieString.split("." + APPWRITE_HOSTNAME).join(newHostname);
	return cookie;
};

export const getExpToken = (token: string) => {
	const tokenParts = token.split(".");
	const tokenBody = JSON.parse(atob(tokenParts[1]));
	return tokenBody.exp * 1000;
};
