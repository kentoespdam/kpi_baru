import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken } from "@helper/index";
import { REMOTE_INDIKATOR } from "@myTypes/entity/indikator";
import axios, { AxiosError } from "axios";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const revalidate = 0;

export const GET = async (
	req: NextRequest,
	{ params }: { params: { kpiId: number } }
) => {
	const cookie = req.cookies;
	const headerList = headers();
	const hostname = String(headerList.get("host")).split(":")[0];
	const { kpiId } = params;

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.get(
			`${REMOTE_INDIKATOR}/kpi/list/${kpiId}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			}
		);
		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), { status: status });
	} catch (e) {
		const err = e as unknown as AxiosError
		console.log(
			"api.indikator.get.id",
			new Date().toString(),
			err.response?.data
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};
