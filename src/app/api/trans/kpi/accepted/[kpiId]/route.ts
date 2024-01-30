import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken } from "@helper/index";
import { REMOTE_TRANS_LOCK } from "@myTypes/entity/trans.accepted.kpi";
import axios, { AxiosError } from "axios";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const PUT = async (
	req: NextRequest,
	{ params }: { params: { kpiId: number } },
) => {
	const cookies = req.cookies;
	const headerList = headers();
	const hostname = String(headerList.get("host")).split(":")[0];
	const { kpiId } = params;
	const body = await req.json();

	try {
		const token = await getCurrentToken(cookies, hostname);
		const { status, data } = await axios.put(
			`${REMOTE_TRANS_LOCK}/${kpiId}/lock`,
			body,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			},
		);
		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), { status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.trans.kpi.accepted.kpiId.lock",
			new Date().toISOString(),
			err.response?.data,
		);
		console.log(err.response?.data);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};

export const DELETE = async (
	req: NextRequest,
	{ params }: { params: { kpiId: number } },
) => {
	const cookies = req.cookies;
	const headerList = headers();
	const hostname = String(headerList.get("host")).split(":")[0];
	const { kpiId } = params;

	try {
		const token = await getCurrentToken(cookies, hostname);
		console.log(token);
		const { status, data } = await axios.delete(
			`${REMOTE_TRANS_LOCK}/${kpiId}/unlock`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			},
		);
		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), { status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.trans.kpi.accepted.kpiId.unlock",
			new Date().toISOString(),
			err.response?.data,
		);
		console.log(err.response?.data);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};
