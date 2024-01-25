import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken } from "@helper/index";
import { KpiWithAudit, REMOTE_KPI } from "@myTypes/entity/kpi";
import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";
import { getOrganizationById } from "src/app/api/eo/organization/find";
import { getPositionById } from "src/app/api/eo/position/find";

export const revalidate = 0;

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: number } }
) => {
	const cookie = req.cookies;
	const hostname = req.nextUrl.hostname;
	const { id } = params;

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.get(`${REMOTE_KPI}/${id}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		if (status === 204) return responseNoContent();

		const kpi = data.data satisfies KpiWithAudit;

		const [org, pos] = await Promise.all([
			await getOrganizationById(kpi.organizationId, token),
			await getPositionById(kpi.positionId, token)
		])

		kpi.organization = org;
		kpi.position = pos;

		data.data = kpi;

		if (status === 204) return responseNoContent();

		return new Response(JSON.stringify(data), { status });
	} catch (e) {
		const err = e as unknown as AxiosError
		console.log("api.kpi.get.id", new Date().toString(), e);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};

export const PUT = async (
	req: NextRequest,
	{ params }: { params: { id: number } }
) => {
	const cookie = req.cookies;
	const hostname = req.nextUrl.hostname;
	const { id } = params;
	const body = await req.json();
	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.put(`${REMOTE_KPI}/${id}`, body, {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e) {
		const err = e as unknown as AxiosError
		console.log("api.kpi.put.id", new Date().toString(), err.response?.data);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};

export const DELETE = async (
	req: NextRequest,
	{ params }: { params: { id: number } }
) => {
	const cookie = req.cookies;
	const hostname = req.nextUrl.hostname;
	const { id } = params;

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.delete(`${REMOTE_KPI}/${id}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		return new Response(JSON.stringify(data), { status });
	} catch (e) {
		const err = e as unknown as AxiosError
		console.log("api.kpi.get.id", new Date().toString(), e);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};
