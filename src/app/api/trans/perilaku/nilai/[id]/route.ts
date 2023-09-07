import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken } from "@helper/index";
import { REMOTE_TRANS_PERILAKU_NILAI } from "@myTypes/entity/trans.perilaku.nilai";
import axios from "axios";
import { NextRequest } from "next/server";

export const PUT = async (
	req: NextRequest,
	{ params }: { params: { id: number } }
) => {
	const cookies = req.cookies;
	const { id } = params;
	const body = await req.json();

	try {
		const token = await getCurrentToken(cookies);
		const { status, data } = await axios.put(
			`${REMOTE_TRANS_PERILAKU_NILAI}/${id}`,
			body,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
			}
		);
		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), { status });
	} catch (e: any) {
		console.log(
			"api.trans.perilaku.put",
			new Date().toISOString(),
			e.response.data.message
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
