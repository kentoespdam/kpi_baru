import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken, appwriteHeader } from "@helper/index";
import {
	BridgeKpiWithAudit,
	BridgeKpiWithPagination,
	REMOTE_BRIDGE_KPI,
} from "@myTypes/entity/bridge.kpi";
import {
	Organization,
	REMOTE_ORGANIZATION,
} from "@myTypes/entity/organization";
import { Position, REMOTE_POSITION } from "@myTypes/entity/position";
import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;
	const search = req.nextUrl.search;

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.get(
			`${REMOTE_BRIDGE_KPI}/page${search}`,
			{
				headers: appwriteHeader(cookie, token),
			}
		);
		const bridgeKpis: BridgeKpiWithPagination = data.data;
		const orgsId = bridgeKpis.content
			.map((kpi: BridgeKpiWithAudit) => kpi.organizationId)
			.join(",");
		const postsId = bridgeKpis.content
			.map((kpi: BridgeKpiWithAudit) => kpi.positionId)
			.join(",");
		const { data: orgData } = await axios.get(
			`${REMOTE_ORGANIZATION}/in/${orgsId}`
		);
		const { data: posData } = await axios.get(
			`${REMOTE_POSITION}/in/${postsId}`
		);

		bridgeKpis.content.map((kpi: BridgeKpiWithAudit) => {
			const organization = orgData.data.find(
				(org: Organization) => org.id === kpi.organizationId
			);

			const position = posData.data.find(
				(pos: Position) => pos.id === kpi.positionId
			);

			kpi.organization = organization;
			kpi.position = position;

			return kpi;
		});

		data.data = bridgeKpis;

		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log(
			"api.bridge.kpi.get",
			new Date().toString(),
			e.response.data
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
export const POST = async (req: NextRequest) => {};
