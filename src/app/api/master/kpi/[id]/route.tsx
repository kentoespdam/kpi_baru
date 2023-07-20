import { responseNoContent } from "@helper/error/nocontent";
import { appwriteHeader, getCurrentToken } from "@helper/index";
import {
	KpiWithAudit,
	KpiWithPagination,
	REMOTE_KPI,
} from "@myTypes/entity/kpi";
import {
	Organization,
	REMOTE_ORGANIZATION,
} from "@myTypes/entity/organization";
import { Position, REMOTE_POSITION } from "@myTypes/entity/position";
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
		const { status, data } = await axios.get(`${REMOTE_KPI}/${id}`, {
			headers: appwriteHeader(cookie, token),
		});
		if (status === 204) return responseNoContent();

		const kpi = data.data satisfies KpiWithAudit;
		const { data: orgData } = await axios.get(
			`${REMOTE_ORGANIZATION}/${kpi.organizationId}`,
			{ headers: appwriteHeader(cookie, token) }
		);
		const org: Organization = orgData.data satisfies Organization;
		const { data: posData } = await axios.get(
			`${REMOTE_POSITION}/${kpi.positionId}`,
			{ headers: appwriteHeader(cookie, token) }
		);
		const pos: Position = posData.data satisfies Position;

		kpi.organization = org;
		kpi.position = pos;

		data.data = kpi;

		if (status === 204) return responseNoContent();

		return new Response(JSON.stringify(data), { status });
	} catch (e: any) {
		console.log("api.kpi.get.id", new Date().toString(), e);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};

export const PUT = async (
	req: NextRequest,
	{ params }: { params: { id: number } }
) => {
	const { id } = params;
	const cookie = req.cookies;
	const body = await req.json();
	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.put(`${REMOTE_KPI}/${id}`, body, {
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
