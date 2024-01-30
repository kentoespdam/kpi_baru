import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import { appwriteKey, authHostname, projectId, sessionNames } from ".";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const isHasSessionCookie = (cookies: RequestCookies) => {
	return cookies.has(sessionNames[0]) || cookies.has(sessionNames[1]);
};

export const isHasTokenCookie = (cookies: RequestCookies) =>
	cookies.has(sessionNames[2]);

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
		"X-Appwrite-Project": projectId,
		"X-Appwrite-key": appwriteKey,
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

export const extractTokenData = (token: string) => {
	const tokenParts = token.split(".");
	return JSON.parse(atob(tokenParts[1]));
};

export const getExpToken = (token: string) => {
	if (!token) return 0;
	const tokenBody = extractTokenData(token);
	return tokenBody.exp * 1000 - 60000;
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

export const newSetCookies = (cookieString: string, hostname?: string) =>
	cookieString.split(`.${authHostname}`).join(newHostname(hostname));