import { getCurrentToken } from "@helper/index";
import {
	BridgePerilakuResponse,
	REMOTE_BRIDGE_PERILAKU,
} from "@myTypes/entity/bridge.perilaku";
import axios, { AxiosError } from "axios";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;
	const headerList = headers();
	const hostname = String(headerList.get("host")).split(":")[0];

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.get<BridgePerilakuResponse>(
			REMOTE_BRIDGE_PERILAKU,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			},
		);

		const bridgePerilakuList = data.data;
		bridgePerilakuList.sort((a, b) => (a.perilaku > b.perilaku ? 1 : -1));
		data.data = bridgePerilakuList;

		return new Response(JSON.stringify(data), { status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.bridge.perilaku.list",
			new Date().toString(),
			err.response?.data,
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};
