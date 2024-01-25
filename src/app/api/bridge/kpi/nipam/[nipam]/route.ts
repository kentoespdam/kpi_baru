import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken } from "@helper/index";
import { REMOTE_BRIDGE_KPI } from "@myTypes/entity/bridge.kpi";
import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";

export const revalidate = 0;

export const GET = async (
	req: NextRequest,
	{ params }: { params: { nipam: number } },
) => {
	const { nipam } = params;
	const cookie = req.cookies;
	const hostname = req.nextUrl.hostname;

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.get(
			`${REMOTE_BRIDGE_KPI}/${nipam}/nipam`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			},
		);
		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), { status: status });
	} catch (e) {
		const error = e as AxiosError;
		console.log(
			"api.bridge.kpi.get.id",
			new Date().toString(),
			error.response?.data,
		);
		return new Response(JSON.stringify(error.response?.data), {
			status: error.response?.status,
		});
	}
};
