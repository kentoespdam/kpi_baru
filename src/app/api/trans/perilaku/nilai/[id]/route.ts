import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken } from "@helper/index";
import { REMOTE_TRANS_PERILAKU_NILAI } from "@myTypes/entity/trans.perilaku.nilai";
import axios, { AxiosError } from "axios";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const PUT = async (
	req: NextRequest,
	{ params }: { params: { id: number } },
) => {
	const cookies = req.cookies;
	const headerList = headers();
	const hostname = String(headerList.get("host")).split(":")[0];
	const { id } = params;
	const body = await req.json();

	try {
		const token = await getCurrentToken(cookies, hostname);
		const { status, data } = await axios.put(
			`${REMOTE_TRANS_PERILAKU_NILAI}/${id}`,
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
			"api.trans.perilaku.put",
			new Date().toISOString(),
			err.response?.data,
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};