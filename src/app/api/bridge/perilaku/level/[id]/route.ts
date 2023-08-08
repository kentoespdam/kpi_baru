import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken, appwriteHeader } from "@helper/index";
import { REMOTE_BRIDGE_PERILAKU } from "@myTypes/entity/bridge.perilaku";
import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: number } }
) => {
	const { id } = params;
	const cookie = req.cookies;

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.get(
			`${REMOTE_BRIDGE_PERILAKU}/${id}/level`,
			{
				headers: appwriteHeader(cookie, token),
			}
		);
		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log(
			"api.bridge.perilaku.level.get",
			new Date().toString(),
			e.response.data
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
