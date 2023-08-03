import { RequestCookie, RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { APPWRITE_PROJECT_ID, sessionNames } from "src/lib";

export const tokenStatus = {
	OK: "ok",
	REVALIDATE: "revalidate",
	REAUTH: "reauth",
} as const;

export const cookieToObj = (cookie: RequestCookie) => {
	const fallback: Record<string, string> = {};
	fallback[cookie.name] = cookie.value;
	return JSON.stringify(fallback);
};

type tokenCheckerResult = {
	status: (typeof tokenStatus)[keyof typeof tokenStatus];
	fallback: string;
};

export const tokenChecker = (
	cookies: RequestCookies | ReadonlyRequestCookies
): tokenCheckerResult => {
	const cookie = cookies.get(sessionNames[0] || sessionNames[1]);
	const cookieToken = cookies.get(sessionNames[2]);
	if (!cookie) return { status: tokenStatus.REAUTH, fallback: "" };
	if (cookie && cookieToken)
		return { status: tokenStatus.OK, fallback: cookieToObj(cookie) };
	return { status: tokenStatus.REVALIDATE, fallback: cookieToObj(cookie) };
};

export const headerAppWriteLogin = () => {
	return {
		"Content-Type": "application/json",
		"X-Appwrite-Project": APPWRITE_PROJECT_ID,
	};
};

export const headerAppWriteOptions = (fallbackToken: string) => {
	return {
		"Content-Type": "application/json",
		"X-Appwrite-Response-Format": "1.0.0",
		"X-Appwrite-Project": APPWRITE_PROJECT_ID,
		"X-Fallback-Cookies": fallbackToken,
	};
};

export const tokenDecode = (token: string) => {
	const payload = token.split(".")[1];
	const jsonPayload = atob(payload);
	return JSON.parse(jsonPayload);
};