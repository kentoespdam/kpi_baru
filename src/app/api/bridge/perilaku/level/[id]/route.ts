import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken, appwriteHeader } from "@helper/index";
import { REMOTE_BRIDGE_PERILAKU } from "@myTypes/entity/bridge.perilaku";
import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: number } },
) => {
	const cookie = req.cookies;
	const hostname = req.nextUrl.hostname;
	const { id } = params;

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.get(
			`${REMOTE_BRIDGE_PERILAKU}/${id}/level`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			},
		);
		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), { status: status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.bridge.perilaku.level.get",
			new Date().toString(),
			err.response?.data,
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};
