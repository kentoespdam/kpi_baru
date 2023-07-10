import { request } from "http";
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

export const appwriteHeader = (sessCookie: string, token?: string) => {
	const header = {
		"X-Appwrite-Project": APPWRITE_PROJECT_ID,
		"Content-Type": "application/json",
		"X-Fallback-Cookies": sessCookie,
	};

	if (token) return { ...header, "X-Appwrite-JWT": token };
	return header;
};

export const newSetCookies = (cookieString: string) => {
	const newHostname =
		APP_HOSTNAME === "localhost" ? APP_HOSTNAME : "." + APP_HOSTNAME;

	let cookie = cookieString.split("." + APPWRITE_HOSTNAME).join(newHostname);
	const expires = cookie.split(";")[1].split("=")[1];
};
