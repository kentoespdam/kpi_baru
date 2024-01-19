import { getCurrentToken } from "@helper/index";
import {
	BridgePerilakuResponse,
	REMOTE_BRIDGE_PERILAKU,
} from "@myTypes/entity/bridge.perilaku";
import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.get<BridgePerilakuResponse>(
			REMOTE_BRIDGE_PERILAKU,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			}
		);

		const bridgePerilakuList = data.data;
		bridgePerilakuList.sort((a, b) => (a.perilaku > b.perilaku ? 1 : -1));
		data.data = bridgePerilakuList;

		return new Response(JSON.stringify(data), { status });
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
}  catch (e: any) {
		console.log(
			"api.bridge.perilaku.list",
			new Date().toString(),
			e.response.data
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
