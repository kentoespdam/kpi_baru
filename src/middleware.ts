import { NextRequest, NextResponse } from "next/server";
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, sessionNames } from "./lib";
import { getExpToken, getSessionCookie, newHostname } from "./helpers";
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
	if (sessCookie === undefined) if (currPath.startsWith("/auth")) return;

	const sess = await getSession(cookies);
	if (!sess) {
		// response.cookies.delete(sessionNames[0]);
		// response.cookies.delete(sessionNames[1]);
		// response.cookies.delete(sessionNames[2]);
		if (currPath.startsWith("/auth")) return;
	}

	if (!cookies.has(sessionNames[2])) {
		const token = await createToken(cookies);
		response.cookies.set(sessionNames[2], token, {
			path: "/",
			expires: new Date(getExpToken(token)),
			domain: newHostname,
			secure:true,
			httpOnly:true,
			
		});

		console.log(response.cookies.getAll());
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

		return req.status === 200 ? true : false;
	} catch (e: any) {
		console.log("middleware error", e);
		return false;
	}
};

const createToken = async (cookies: RequestCookies) => {
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
		const req = await fetch(`${APPWRITE_ENDPOINT}/v1/account/jwt`, {
			method: "POST",
			headers: headers,
		});
		console.log(req.status);
		if (req.status !== 201) throw Error(req.statusText);

		const data = await req.json();
		return data.jwt;
	} catch (e: any) {
		console.log("middleware error", e);
	}
};
