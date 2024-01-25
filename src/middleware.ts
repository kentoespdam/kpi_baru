import { useSessionStore } from "@store/main/session";
import { NextRequest, NextResponse } from "next/server";
import {
	RequestCookie,
	RequestCookies,
} from "next/dist/compiled/@edge-runtime/cookies";
import {
	appwriteHeader,
	getExpToken,
	isHasSessionCookie,
	isHasTokenCookie,
	isValidIpAddress,
	newHostname,
} from "./helpers";
import { APPWRITE_ENDPOINT, sessionNames } from "./lib";

export const middleware = async (req: NextRequest) => {
	const response = NextResponse.next();
	const currPath = req.nextUrl.pathname;
	const cookies = req.cookies;
	const host = req.nextUrl.hostname;

	if (!isHasSessionCookie(cookies) && !currPath.startsWith("/auth"))
		return NextResponse.redirect(
			new URL(
				`/auth?callbackUrl=${encodeURIComponent(req.nextUrl.href)}`,
				req.nextUrl.origin,
			),
			{
				headers: {
					"set-cookie": `callback_url=${encodeURIComponent(req.nextUrl.href)}`,
				},
			},
		);

	if (currPath === "/")
		return NextResponse.redirect(new URL("/trans/kpi", req.nextUrl.origin));

	const sess = await getSession(cookies);
	if (!sess) {
		// response.cookies.delete(sessionNames[0]);
		// response.cookies.delete(sessionNames[1]);
		// response.cookies.delete(sessionNames[2]);
		if (currPath.startsWith("/auth") || currPath.startsWith("/api/auth"))
			return response;

		return NextResponse.redirect(
			new URL(
				`/auth?callbackUrl=${encodeURIComponent(req.nextUrl.href)}`,
				req.nextUrl.origin,
			),
			{
				headers: {
					"set-cookie": `callback_url=${encodeURIComponent(req.nextUrl.href)}`,
				},
			},
		);
	}

	if (!isHasTokenCookie(cookies)) {
		const token = await renewToken(cookies, host);
		response.cookies.set(token.name, token.value, token);
	}

	return response;
};

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!_next/static|_next/image|favicon.ico|images|api/).*)",
	],
};

const getSession = async (cookies: RequestCookies) => {
	const reqHeaders = appwriteHeader(cookies);
	try {
		const req = await fetch(`${APPWRITE_ENDPOINT}/v1/account/session/current`, {
			method: "GET",
			headers: reqHeaders,
		});

		const data = await req.json();
		if (useSessionStore.getState().user === null)
			useSessionStore.setState({ user: data });

		return true;
	} catch (e) {
		console.log("middleware get session:", e);
		return false;
	}
};

export const renewToken = async (cookies: RequestCookies, host: string) => {
	const reqHeaders = appwriteHeader(cookies);

	try {
		const req = await fetch(`${APPWRITE_ENDPOINT}/v1/account/jwt`, {
			method: "POST",
			headers: reqHeaders,
		});
		const data = await req.json();
		const expires = getExpToken(data.jwt);
		const result = {
			name: sessionNames[2],
			value: data.jwt,
			path: "/",
			expires: new Date(expires),
		};
		if (!isValidIpAddress(host)) {
			Object.assign(result, {
				domain: newHostname(host),
				httpOnly: true,
				secure: true,
				sameSite: true,
				priority: "hight",
			});
		}

		return result as RequestCookie;
	} catch (e) {
		console.log("middleware create token", e);
		return {} as RequestCookie;
	}
};
