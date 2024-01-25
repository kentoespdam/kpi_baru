import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken } from "@helper/index";
import { REMOTE_TRANS_PERILAKU } from "@myTypes/entity/trans.perilaku";
import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { nipam: string; periode: number; levelId: number } },
) => {
	const cookies = req.cookies;
	const hostname = req.nextUrl.hostname;
	const { nipam, periode, levelId } = params;

	try {
		const token = await getCurrentToken(cookies, hostname);
		const { status, data } = await axios.get(
			`${REMOTE_TRANS_PERILAKU}/${periode}/periode/${nipam}/nipam/${levelId}/level`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			},
		);
		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), { status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.trans.perilaku.nipam.periode.levelId",
			new Date().toISOString(),
			err.response?.data,
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};
