import { appwriteHeader, setExpiredCookie } from "@helper/index";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { APPWRITE_ENDPOINT } from "src/lib";

export const revalidate = false

export const GET = async (req: NextRequest) => {
	const cookies = req.cookies;
	try {
		if (cookies.size === 0)
			return NextResponse.redirect(new URL("/auth", req.url));
		const { status, data } = await axios.delete(
			`${APPWRITE_ENDPOINT}/v1/account/sessions/current`,
			{
				headers: appwriteHeader(cookies),
			}
		);
		if (status === 204)
			return NextResponse.redirect(new URL("/auth", req.url), {
				headers: {
					"Set-Cookie": setExpiredCookie(cookies),
				},
			});
	} catch (e: any) {
		console.log("api.auth.logout.delete", new Date().toISOString());
		return NextResponse.redirect(new URL("/auth", req.url), {
			headers: {
				"Set-Cookie": setExpiredCookie(cookies),
			},
		});
	}
};
