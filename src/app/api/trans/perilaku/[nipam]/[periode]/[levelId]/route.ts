import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken, appwriteHeader } from "@helper/index";
import { REMOTE_TRANS_PERILAKU } from "@myTypes/entity/trans.perilaku";
import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { nipam: string; periode: number; levelId: number } }
) => {
	const { nipam, periode, levelId } = params;
	const cookies = req.cookies;

	try {
		const token = await getCurrentToken(cookies);
		const { status, data } = await axios.get(
			`${REMOTE_TRANS_PERILAKU}/${periode}/periode/${nipam}/nipam/${levelId}/level`,
			{ headers: appwriteHeader(cookies, token) }
		);
		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), { status });
	} catch (e: any) {
		console.log(
			"api.trans.perilaku.nipam.periode.levelId",
			new Date().toISOString(),
			e.response.data.message
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
