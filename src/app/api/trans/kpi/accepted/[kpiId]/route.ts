import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken } from "@helper/index";
import { REMOTE_TRANS_LOCK } from "@myTypes/entity/trans.accepted.kpi";
import axios from "axios";
import { NextRequest } from "next/server";

export const PUT = async (
	req: NextRequest,
	{ params }: { params: { kpiId: number } }
) => {
	const { kpiId } = params;
	const body = await req.json();
	const cookies = req.cookies;

	try {
		const token = await getCurrentToken(cookies);
		const { status, data } = await axios.put(
			`${REMOTE_TRANS_LOCK}/${kpiId}/lock`,
			body,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
			}
		);
		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), { status });
	} catch (e: any) {
		console.log(
			"api.trans.kpi.accepted.kpiId.lock",
			new Date().toISOString(),
			e.response.data.message
		);
		console.log(e.response.data);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};

export const DELETE = async (
	req: NextRequest,
	{ params }: { params: { kpiId: number } }
) => {
	const { kpiId } = params;
	const cookies = req.cookies;

	try {
		const token = await getCurrentToken(cookies);
		const { status, data } = await axios.delete(
			`${REMOTE_TRANS_LOCK}/${kpiId}/unlock`,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
			}
		);
		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), { status });
	} catch (e: any) {
		console.log(
			"api.trans.kpi.accepted.kpiId.unlock",
			new Date().toISOString(),
			e.response.data.message
		);
		console.log(e.response.data);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
