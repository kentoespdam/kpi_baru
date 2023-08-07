import { appwriteHeader, getCurrentToken } from "@helper/index";
import { REMOTE_PROFESI } from "@myTypes/entity/profesi";
import axios from "axios";
import { NextRequest } from "next/server";

export const revalidate = 0;

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;
	const search = new URLSearchParams();
	search.set("status", "Enabled");

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.get(
			`${REMOTE_PROFESI}?${search}`,
			{
				headers: appwriteHeader(cookie, token),
			}
		);
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log(
			"api.master.profesi.list.get",
			new Date().toString(),
			e.response.data
		);
	}
};
