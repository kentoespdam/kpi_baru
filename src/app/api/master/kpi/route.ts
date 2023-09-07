import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken } from "@helper/index";
import {
	KpiWithAudit,
	KpiWithPagination,
	REMOTE_KPI,
} from "@myTypes/entity/kpi";
import { Organization } from "@myTypes/entity/organization";
import { Position } from "@myTypes/entity/position";
import { getOrgInList } from "@utils/eo/server/organization";
import { getPosInList } from "@utils/eo/server/position";
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

		const content = data.data.content;
		const orgsId = content
			.map((kpi: KpiWithAudit) => kpi.organizationId)
			.join(",");

		const postsId = content
			.map((kpi: KpiWithAudit) => kpi.positionId)
			.join(",");

		const [orgData, posData] = await Promise.all([
			await getOrgInList(orgsId),
			await getPosInList(postsId),
		]);

		await Promise.all(
			content.map(async (kpi: KpiWithAudit) => {
				kpi.organization = await new Promise((resolve, reject) => {
					const org = orgData.find(
						(org: Organization) => org.id === kpi.organizationId
					);
					org ? resolve(org) : reject("Organization not found");
				});
				kpi.position = await new Promise((resolve, reject) => {
					const pos = posData.find(
						(pos: Position) => pos.id === kpi.positionId
					);
					pos ? resolve(pos) : reject("Position not found");
				});

				return kpi;
			})
		);

		data.data.content = content;

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
