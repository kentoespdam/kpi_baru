import { appwriteHeader, getCurrentToken } from "@helper/index";
import { REMOTE_INDIKATOR } from "@myTypes/entity/indikator";
import axios from "axios";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
	const cookie = req.cookies;
	const body = await req.json();
	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.post(`${REMOTE_INDIKATOR}`, body, {
			headers: appwriteHeader(cookie, token),
		});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log(
			"api.indikator.post",
			new Date().toString(),
			e.response.data
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
