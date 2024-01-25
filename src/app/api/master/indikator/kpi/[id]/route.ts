import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken } from "@helper/index";
import { REMOTE_INDIKATOR } from "@myTypes/entity/indikator";
import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";

export const revalidate = 0;

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: number } },
) => {
	const cookie = req.cookies;
	const hostname = req.nextUrl.hostname;
	const { id } = params;
	const { search } = req.nextUrl;

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.get(
			`${REMOTE_INDIKATOR}/kpi/${id}${search}`,
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
		const err = e as unknown as AxiosError;
		console.log("api.indikator.get", new Date().toString(), err.response?.data);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};
