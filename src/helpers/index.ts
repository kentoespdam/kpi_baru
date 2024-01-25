import {
	RequestCookie,
	RequestCookies,
} from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import {
	APPWRITE_API_KEY,
	APPWRITE_HOSTNAME,
	APPWRITE_PROJECT_ID,
	sessionNames,
} from "src/lib";
import { createToken } from "src/lib/appwrite";

export const getSessionCookie = (cookies: RequestCookies) => {
	const sess =
		cookies.get(sessionNames[0])?.value || cookies.get(sessionNames[1])?.value;
	return sess;
};

export const isHasSessionCookie = (cookies: RequestCookies) =>
	cookies.has(sessionNames[0]) || cookies.has(sessionNames[1]);

export const isHasTokenCookie = (cookies: RequestCookies) =>
	cookies.has(sessionNames[2]);

export const xfallback = (
	sessCookie: RequestCookies | ReadonlyRequestCookies,
) => {
	return (
		sessCookie.get(sessionNames[0])?.value ||
		sessCookie.get(sessionNames[1])?.value ||
		""
	);
};

export const xFallbackFromCookie = (
	cookies: RequestCookies | ReadonlyRequestCookies,
) => {
	const currentCookie =
		`${cookies.get(sessionNames[0])?.value}` ||
		`${cookies.get(sessionNames[1])}` ||
		"";

	return `{"${sessionNames[0]}":"${currentCookie}"}`;
};

export const appwriteHeader = (
	sessCookie: string | RequestCookies | ReadonlyRequestCookies,
	token?: string,
	contentType?: string,
) => {
	const headers = {
		"Content-Type": contentType ? contentType : "application/json",
		"X-Appwrite-Response-Format": "1.0.0",
		Cookie: sessCookie.toString(),
		"X-Appwrite-Project": APPWRITE_PROJECT_ID,
		"X-Appwrite-key": APPWRITE_API_KEY,
	};

	if (token) {
		Object.assign(headers, { "X-Appwrite-JWT": token });
		return headers;
	}

	switch (typeof sessCookie) {
		case "object":
			Object.assign(headers, {
				Cookie: sessCookie.toString(),
				"X-Fallback-Cookies": xFallbackFromCookie(sessCookie),
			});
			return headers;
		default:
			Object.assign(headers, {
				Cookie: sessCookie,
				"X-Fallback-Cookies": sessCookie,
			});
			return headers;
	}
};

export const isValidIpAddress = (ipAddress?: string) => {
	if (
		ipAddress &&
		/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
			ipAddress,
		)
	) {
		return true;
	}
	return false;
};

export const newHostname = (hostname?: string) =>
	hostname === "localhost"
		? hostname
		: isValidIpAddress(hostname)
		  ? undefined
		  : `.${hostname}`;

export const newSetCookies = (cookieString: string, hostname?: string) => {
	// let cookie = cookieString.split("." + APPWRITE_HOSTNAME).join(newHostname);
	const cookie = cookieString
		.split(`.${APPWRITE_HOSTNAME}`)
		.join(newHostname(hostname));
	return cookie;
};

export const getCurrentToken = async (
	cookies: RequestCookies | ReadonlyRequestCookies,
) => {
	const cookieToken = cookies.get(sessionNames[2])?.value;
	if (cookieToken) return cookieToken;
	const token = await createToken(cookies);
	return token;
};

export const getExpToken = (token: string) => {
	if (!token) return 0;
	const tokenParts = token.split(".");
	const tokenBody = JSON.parse(atob(tokenParts[1]));
	return tokenBody.exp * 1000 - 60000;
};

export const setExpiredCookie = (
	cookies: RequestCookies,
	hostname?: string,
) => {
	if (cookies.size === 0) return "";
	const expiredCookie = cookies.getAll().map((cookie) => {
		cookie.value += `; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${newHostname(
			hostname,
		)}; secure; httponly`;
		return `${cookie.name}=${cookie.value}`;
	});
	const result = expiredCookie.join(", ").toString();
	return result;
};

export const setCookieToken = (token: string, hostname?: string) => {
	const resCookie = `${sessionNames[2]}=${token}; domain=${newHostname(
		hostname,
	)}; expires=${new Date(
		getExpToken(token),
	)}; path=/; httponly; SameSite=none; Secure`;
	return resCookie;
};

export const cookieStringToObject = (
	cookieString: string,
	headers: ReadonlyHeaders,
): RequestCookie => {
	const host = headers.get("host") ? headers.get("host")?.split(":")[0] : "";
	const arrCookie = cookieString.split(";");

	return arrCookie.reduce((acc, cookie) => {
		const [key, val] = cookie.trim().split("=").map(decodeURIComponent);
		if (sessionNames.includes(key))
			return Object.assign(acc, {
				name: key,
				value: val,
			});

		switch (key) {
			case "expires":
				return Object.assign(acc, {
					maxAge: new Date(val).getTime(),
				});
			case "domain":
				return Object.assign(acc, { domain: newHostname(host) });
			case "secure":
				if (isValidIpAddress(host)) return acc;
				return Object.assign(acc, { secure: true });
			case "httponly":
				if (isValidIpAddress(host)) return acc;
				return Object.assign(acc, { httpOnly: true });
			case "samesite":
				if (isValidIpAddress(host)) return acc;
				return Object.assign(acc, { sameSite: val });
			case "path":
				return Object.assign(acc, { path: val });
			case "priority":
				return Object.assign(acc, { priority: val });
		}

		try {
			return Object.assign(acc, { [key]: JSON.parse(val) });
		} catch (e) {
			return Object.assign(acc, { [key]: val });
		}
	}, {}) as RequestCookie;
};
