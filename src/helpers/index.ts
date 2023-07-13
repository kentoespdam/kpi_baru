import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import {
	APPWRITE_HOSTNAME,
	APPWRITE_PROJECT_ID,
	APP_HOSTNAME,
	sessionNames,
} from "src/lib";
import { createToken } from "src/lib/appwrite";

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

const newHostname =
	APP_HOSTNAME === "localhost" ? APP_HOSTNAME : "." + APP_HOSTNAME;

export const newSetCookies = (cookieString: string) => {
	let cookie = cookieString.split("." + APPWRITE_HOSTNAME).join(newHostname);
	return cookie;
};

export const getCurrentToken = async (cookies: RequestCookies) => {
	const cookieToken = cookies.get(sessionNames[2])?.value;
	if (cookieToken) return cookieToken;
	const token = await createToken(cookies);
	return token;
};

export const getExpToken = (token: string) => {
	const tokenParts = token.split(".");
	const tokenBody = JSON.parse(atob(tokenParts[1]));
	return tokenBody.exp * 1000;
};

export const setExpiredCookie = (cookies: RequestCookies) => {
	if (cookies.size === 0) return "";
	const expiredCookie = cookies.getAll().map((cookie) => {
		cookie.value += `; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${newHostname}; secure; httponly`;
		return `${cookie.name}=${cookie.value}`;
	});
	const result = expiredCookie.join(", ").toString();
	return result;
};

export const setCookieToken = (token: string) => {
	const resCookie = `${
		sessionNames[2]
	}=${token}; domain=${APP_HOSTNAME}; expires=${new Date(
		getExpToken(token)
	)}; path=/; httponly; SameSite=none; Secure`;
	return resCookie;
};
