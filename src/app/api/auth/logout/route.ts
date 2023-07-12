import { appwriteHeader, setExpiredCookie } from "@helper/index";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { APPWRITE_ENDPOINT } from "src/lib";

export const GET = async (req: NextRequest) => {
	const cookies = req.cookies;
	try {
		if (cookies.size === 0)
			return NextResponse.redirect(new URL("/auth", req.url));
		await axios.delete(`${APPWRITE_ENDPOINT}/v1/account/sessions/current`, {
			headers: appwriteHeader(cookies),
		});
		// console.log(status);
		// return new Response(setExpiredCookie(cookies));
		return NextResponse.redirect(new URL("/auth", req.url), {
			headers: {
				"Set-Cookie": setExpiredCookie(cookies),
			},
		});
	} catch (e: any) {
		console.log(
			"api.auth.logout.get",
			new Date().toISOString(),
			e.response.data
		);
		return NextResponse.redirect(new URL("/auth", req.url), {
			headers: {
				"Set-Cookie": setExpiredCookie(cookies),
			},
		});
	}
};
