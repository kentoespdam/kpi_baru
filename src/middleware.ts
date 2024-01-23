import { NextRequest, NextResponse } from "next/server";
import {
	appwriteHeader,
	getExpToken,
	isHasSessionCookie,
	isHasTokenCookie,
	isValidIpAddress,
	newHostname,
} from "./helpers";
import { baseAuthUrl, publicUrl, sessionNames } from "./utils";
import {
	RequestCookie,
	RequestCookies,
} from "next/dist/compiled/@edge-runtime/cookies";

export async function middleware(req: NextRequest) {
	const response = NextResponse.next();
	const host = req.nextUrl.host.split(":")[0];
	const currPath = req.nextUrl.pathname;
	const cookies = req.cookies;

	if (!isHasSessionCookie(cookies) && !currPath.startsWith("/auth"))
		return NextResponse.redirect(
			new URL(
				`/auth?callbackUrl=${encodeURIComponent(req.nextUrl.href)}`,
				publicUrl,
			),
			{
				headers: {
					"set-cookie": `callback_url=${encodeURIComponent(req.nextUrl.href)}`,
				},
			},
		);

	const activeSession = await isHasAuthSession(cookies);
	if (!activeSession) {
		response.cookies.delete(sessionNames[0]);
		response.cookies.delete(sessionNames[1]);
		response.cookies.delete(sessionNames[2]);
		if (currPath.startsWith("/auth") || currPath.startsWith("/api/auth"))
			return response;
		return NextResponse.redirect(
			new URL(
				`/auth?callbackUrl=${encodeURIComponent(req.nextUrl.href)}`,
				publicUrl,
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
		console.log(token);
		response.cookies.set(token.name, token.value, token);
	}

	return response;
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|logo_pdam_40x40|api/auth/|test).*)",
	],
};

export const isHasAuthSession = async (cookies: RequestCookies) => {
	const reqHeaders = appwriteHeader(cookies);
	try {
		const req = await fetch(`${baseAuthUrl}/account/session/current`, {
			method: "GET",
			headers: reqHeaders,
		});
		if (req.status === 401) return false;
		return true;
	} catch (e) {
		console.log("middleware get current session", e);
		return false;
	}
};

export const renewToken = async (cookies: RequestCookies, host: string) => {
	const reqHeaders = appwriteHeader(cookies);

	try {
		const req = await fetch(`${baseAuthUrl}/account/jwt`, {
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
