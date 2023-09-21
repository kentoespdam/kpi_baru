import { appwriteHeader, setExpiredCookie } from "@helper/index";
import axios from "axios";
import { NextRequest } from "next/server";
import { APPWRITE_ENDPOINT, sessionNames } from "src/lib";

export const revalidate = false;

export const GET = async (req: NextRequest) => {
	const cookies = req.cookies;
	const hostname = req.headers.get("host")?.split(":")[0];
	try {
		if (cookies.has(sessionNames[0]) || cookies.has(sessionNames[1])) {
			const { status, data } = await axios.delete(
				`${APPWRITE_ENDPOINT}/v1/account/sessions/current`,
				{
					headers: appwriteHeader(cookies),
				}
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
					}
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
			}
		);
	} catch (e: any) {
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
			}
		);
	}
};
