import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken } from "@helper/index";
import { REMOTE_TRANS_KPI } from "@myTypes/entity/trans.kpi";
import axios, { AxiosError } from "axios";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const revalidate = 0;

export const GET = async (
	req: NextRequest,
	{ params }: { params: { nipam: string; periode: number; kpiId: number } },
) => {
	const cookies = req.cookies;
	const headerList = headers();
	const hostname = String(headerList.get("host")).split(":")[0];
	const { nipam, periode, kpiId } = params;

	try {
		const token = await getCurrentToken(cookies, hostname);
		const { status, data } = await axios.get(
			`${REMOTE_TRANS_KPI}/${periode}/periode/${nipam}/nipam/${kpiId}/kpi`,
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
			"api.trans.kpi.nipam.periode.kpiId",
			new Date().toISOString(),
			err.response?.data,
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};
