import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken } from "@helper/index";
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

export const revalidate = 0;

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;
	const search = req.nextUrl.search;

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.get(
			`${REMOTE_KPI}/page${search}`,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
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
			kpi.organization = orgData.data.find(
				(org: Organization) => org.id === kpi.organizationId
			);
			kpi.position = posData.data.find(
				(pos: Position) => pos.id === kpi.positionId
			);

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
			headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
		});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log("api.kpi.post", new Date().toString(), e.response.data);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
