import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken } from "@helper/index";
import { REMOTE_TRANS_KPI } from "@myTypes/entity/trans.kpi";
import axios from "axios";
import { NextRequest } from "next/server";

export const revalidate = 0;

export const GET = async (
	req: NextRequest,
	{ params }: { params: { nipam: string; periode: number; kpiId: number } }
) => {
	const { nipam, periode, kpiId } = params;
	const cookies = req.cookies;

	try {
		const token = await getCurrentToken(cookies);
		const { status, data } = await axios.get(
			`${REMOTE_TRANS_KPI}/${periode}/periode/${nipam}/nipam/${kpiId}/kpi`,
			{ headers: appwriteHeader(cookies, token) }
		);
		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), { status });
	} catch (e: any) {
		console.log(
			"api.trans.kpi.nipam.periode.kpiId",
			new Date().toISOString(),
			e.response.data.message
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
