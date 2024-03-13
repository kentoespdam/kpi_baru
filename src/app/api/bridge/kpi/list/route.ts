import { getCurrentToken } from "@helper/index";
import {
	BridgeKpiResponse,
	REMOTE_BRIDGE_KPI,
} from "@myTypes/entity/bridge.kpi";
import axios, { AxiosError } from "axios";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;
	const headerList = headers();
	const hostname = String(headerList.get("host")).split(":")[0];

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.get<BridgeKpiResponse>(
			`${REMOTE_BRIDGE_KPI}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			},
		);

		const bridgeKpiList = data.data;
		bridgeKpiList.sort((a, b) => (a.name > b.name ? 1 : -1));
		data.data = bridgeKpiList;

		return new Response(JSON.stringify(data), { status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.bridge.kpi.list",
			new Date().toString(),
			err.response?.data,
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};
