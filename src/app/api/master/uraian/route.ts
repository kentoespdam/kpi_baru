import { getCurrentToken, appwriteHeader } from "@helper/index";
import { REMOTE_URAIAN } from "@myTypes/entity/uraian";
import axios from "axios";
import { NextRequest } from "next/server";

export const revalidate = 0;

export const POST = async (req: NextRequest) => {
	const cookie = req.cookies;
	const body = await req.json();

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.post(`${REMOTE_URAIAN}`, body, {
			headers: appwriteHeader(cookie, token),
		});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log(
			"api.master.uraian.post",
			new Date().toISOString(),
			e.response.data.message
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
