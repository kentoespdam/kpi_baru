import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken, appwriteHeader } from "@helper/index";
import { REMOTE_TRANS_URAIAN } from "@myTypes/entity/trans.uraian";
import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: number } }
) => {
	const cookies = req.cookies;
	const { id } = params;

	try {
		const token = await getCurrentToken(cookies);
		const { status, data } = await axios.get(
			`${REMOTE_TRANS_URAIAN}/${id}`,
			{ headers: appwriteHeader(cookies, token) }
		);
		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), { status });
	} catch (e: any) {
		console.log(
			"api.trans.uraian.id",
			new Date().toISOString(),
			e.response.data.message
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
