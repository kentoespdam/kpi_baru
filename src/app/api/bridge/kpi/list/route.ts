import { getCurrentToken } from "@helper/index";
import {
	BridgeKpiResponse,
	REMOTE_BRIDGE_KPI,
} from "@myTypes/entity/bridge.kpi";
import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.get<BridgeKpiResponse>(
			`${REMOTE_BRIDGE_KPI}`,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
			}
		);

		const bridgeKpiList = data.data;
		bridgeKpiList.sort((a, b) => (a.name > b.name ? 1 : -1));
		data.data = bridgeKpiList;

		return new Response(JSON.stringify(data), { status });
	} catch (e: any) {
		console.log(
			"api.bridge.kpi.list",
			new Date().toString(),
			e.response.data
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
