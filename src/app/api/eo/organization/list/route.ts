import { responseNoContent } from "@helper/error/nocontent";
import { appwriteHeader, getCurrentToken } from "@helper/index";
import { REMOTE_ORGANIZATION } from "@myTypes/entity/organization";
import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;
	const search = new URLSearchParams();
	search.set("status", "Enabled");

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.get(
			`${REMOTE_ORGANIZATION}/list?${search.toString()}`,
			{
				headers: appwriteHeader(cookie, token),
			}
		);
		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), {
			status,
		});
	} catch (e: any) {
		console.log(
			"api.eo.organization.list.get",
			new Date().toString(),
			e.response.data
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
