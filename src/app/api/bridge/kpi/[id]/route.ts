import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken, isHasTokenCookie } from "@helper/index";
import { createToken, createTokenLogin } from "@lib/appwrite";
import {
	BridgeKpiWithAudit,
	REMOTE_BRIDGE_KPI,
} from "@myTypes/entity/bridge.kpi";
import { REMOTE_ORGANIZATION } from "@myTypes/entity/organization";
import { REMOTE_POSITION } from "@myTypes/entity/position";
import axios, { AxiosError } from "axios";
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";
import { DEFAULT_MAIL_DOMAIN } from "src/lib";
import {
	createUserAccount,
	getPrefs,
	updateRoleUser,
} from "src/lib/appwrite/user";

export const revalidate = 0;

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: number } },
) => {
	const cookie = req.cookies;
	const headerList = headers();
	const hostname = String(headerList.get("host")).split(":")[0];
	const { id } = params;

	try {
		if (!isHasTokenCookie(cookie)) {
			const tokenLogin = await createToken(cookie, hostname);
			console.log(tokenLogin);
			cookies().set(tokenLogin.name, tokenLogin.value, tokenLogin);
		}
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.get(`${REMOTE_BRIDGE_KPI}/${id}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const bridgeKpis: BridgeKpiWithAudit = data.data;
		const orgId = bridgeKpis.organizationId;
		const posId = bridgeKpis.positionId;
		const { data: orgData } = await axios.get(
			`${REMOTE_ORGANIZATION}/${orgId}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			},
		);
		const { data: posData } = await axios.get(`${REMOTE_POSITION}/${posId}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const roles = await getPrefs(cookie, bridgeKpis.nipam);

		bridgeKpis.organization = orgData.data;
		bridgeKpis.position = posData.data;
		if (roles !== null) bridgeKpis.roles = roles.roles;

		data.data = bridgeKpis;

		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), { status: status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.bridge.kpi.get.id",
			new Date().toString(),
			err.response?.data,
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};

export const PUT = async (
	req: NextRequest,
	{ params }: { params: { id: number } },
) => {
	const cookie = req.cookies;
	const headerList = headers();
	const hostname = String(headerList.get("host")).split(":")[0];
	const { id } = params;
	const body = await req.json();

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.put(
			`${REMOTE_BRIDGE_KPI}/${id}`,
			body,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			},
		);
		const account = await createUserAccount(cookie, {
			userId: body.nipam,
			email: `${body.nipam}@${DEFAULT_MAIL_DOMAIN}`,
			name: body.name,
			password: `${process.env.DEFAULT_PASSWORD}`,
		});
		await updateRoleUser(cookie, account.$id, body.roles);
		return new Response(JSON.stringify(data), { status: status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.bridge.kpi.put",
			new Date().toString(),
			err.response?.data,
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};

export const DELETE = async (
	req: NextRequest,
	{ params }: { params: { id: number } },
) => {
	const cookie = req.cookies;
	const headerList = headers();
	const hostname = String(headerList.get("host")).split(":")[0];
	const { id } = params;

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.delete(`${REMOTE_BRIDGE_KPI}/${id}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), { status: status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.bridge.kpi.delete.id",
			new Date().toString(),
			err.response?.data,
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};
