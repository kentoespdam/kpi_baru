import {
	appwriteHeader,
	isHasSessionCookie,
	setExpiredCookie,
} from "@helper/index";
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { APPWRITE_ENDPOINT } from "src/lib";

export const revalidate = false;

export const GET = async (req: NextRequest) => {
	const cookies = req.cookies;
	const headerList = headers();
	const hostname = String(headerList.get("host")).split(":")[0];

	try {
		if (isHasSessionCookie(cookies)) {
			const reqHeader = appwriteHeader(cookies);
			const { status } = await axios.delete(
				`${APPWRITE_ENDPOINT}/v1/account/sessions/current`,
				{ headers: reqHeader },
			);

			if (status === 204)
				return new Response(
					JSON.stringify({
						status: "success",
						message: "Logout Success",
					}),
					{
						headers: {
							"Set-Cookie": setExpiredCookie(cookies, hostname),
						},
					},
				);
		}
		return new Response(
			JSON.stringify({
				status: "success",
				message: "Logout Success",
			}),
			{
				headers: {
					"Set-Cookie": setExpiredCookie(cookies, hostname),
				},
			},
		);
	} catch (e) {
		console.log("api.auth.logout.delete", new Date().toISOString());
		return new Response(
			JSON.stringify({
				status: "success",
				message: "Logout Success",
			}),
			{
				headers: {
					"Set-Cookie": setExpiredCookie(cookies, hostname),
				},
			},
		);
	}
};
