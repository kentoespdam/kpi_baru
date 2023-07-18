import { responseNoContent } from "@helper/error/nocontent";
import { appwriteHeader, getCurrentToken } from "@helper/index";
import {
	KpiWithAudit,
	KpiWithPagination,
	REMOTE_KPI,
} from "@myTypes/entity/kpi";
import {
	REMOTE_ORGANIZATION,
	Organization,
} from "@myTypes/entity/organization";
import { REMOTE_POSITION, Position } from "@myTypes/entity/position";
import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;
	const search = req.nextUrl.search;

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.get(
			`${REMOTE_KPI}/page${search}`,
			{
				headers: appwriteHeader(cookie, token),
			}
		);
		if (status === 204) return responseNoContent();

		const kpiPage = data.data satisfies KpiWithPagination;
		const orgsId = kpiPage.content
			.map((kpi: KpiWithAudit) => kpi.organizationId)
			.join(",");

		const postsId = kpiPage.content
			.map((kpi: KpiWithAudit) => kpi.positionId)
			.join(",");

		const { data: orgData } = await axios.get(
			`${REMOTE_ORGANIZATION}/in/${orgsId}`
		);
		const { data: posData } = await axios.get(
			`${REMOTE_POSITION}/in/${postsId}`
		);
		kpiPage.content = kpiPage.content.map((kpi: KpiWithAudit) => {
			kpi.organization = orgData.data.filter(
				(org: Organization) => org.id === kpi.organizationId
			)[0];
			kpi.position = posData.data.filter(
				(pos: Position) => pos.id === kpi.positionId
			)[0];

			return kpi;
		});

		data.data = kpiPage;

		return new Response(JSON.stringify(data), { status });
	} catch (e: any) {
		console.log("api.kpi.get", new Date().toString(), e.response.data);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
export const POST = async (req: NextRequest) => {
	const cookie = req.cookies;
	const body = await req.json();
	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.post(`${REMOTE_KPI}`, body, {
			headers: appwriteHeader(cookie, token),
		});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log("api.kpi.put.id", new Date().toString(), e.response.data);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
