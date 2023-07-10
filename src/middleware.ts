import { NextRequest, NextResponse } from "next/server";
import { sessionNames } from "./lib";
import { getSessionCookie } from "./helpers";
import { getAppwriteSession } from "./lib/appwrite";

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
		return response;
	}

	const sess = await getAppwriteSession(sessCookie);
	if (sess.code === 401) {
		response.cookies.delete(sessionNames[0]);
		response.cookies.delete(sessionNames[1]);
		response.cookies.delete(sessionNames[2]);
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
