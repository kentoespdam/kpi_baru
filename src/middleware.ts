import { NextRequest, NextResponse } from "next/server";
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, sessionNames } from "./lib";
import { getSessionCookie } from "./helpers";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export const middleware = async (req: NextRequest) => {
	const response = NextResponse.next();
	const currPath = req.nextUrl.pathname;
	const cookies = req.cookies;

	if (
		(!cookies.has(sessionNames[0]) || !cookies.has(sessionNames[1])) &&
		!currPath.startsWith("/auth")
	)
		return NextResponse.redirect(new URL("/auth", req.url));

	const sessCookie = getSessionCookie(cookies);
	if (sessCookie === undefined) {
		response.cookies.delete(sessionNames[0]);
		response.cookies.delete(sessionNames[1]);
		response.cookies.delete(sessionNames[2]);
		if (currPath.startsWith("/auth")) return;
		return response;
	}

	const sess = await getSession(cookies);
	console.log("sess", sess);
	if (sess?.status !== 200) {
		response.cookies.delete(sessionNames[0]);
		response.cookies.delete(sessionNames[1]);
		response.cookies.delete(sessionNames[2]);
		if (currPath.startsWith("/auth")) return;
		return response;
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
		"/((?!api|_next/static|_next/image|favicon.ico|images).*)",
	],
};

const getSession = async (cookies: RequestCookies) => {
	try {
		const xfallback =
			cookies.get(sessionNames[0])?.value ||
			cookies.get(sessionNames[1])?.value ||
			"";
		const cookieString = cookies.toString();
		const decodedCookie = decodeURIComponent(cookieString);
		const headers = {
			"Content-Type": "application/json",
			"X-Appwrite-Project": APPWRITE_PROJECT_ID,
			"Cookie": decodedCookie,
			"X-Fallback-Cookies": xfallback,
		};
		const req = await fetch(
			`${APPWRITE_ENDPOINT}/v1/account/sessions/current`,
			{
				method: "GET",
				headers: headers,
			}
		);
		const status = req.status;
		const res = await req.json();
		return { status, res };
	} catch (e) {
		console.log("middleware error", e);
	}
};
