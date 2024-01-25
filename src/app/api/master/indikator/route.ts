import { getCurrentToken } from "@helper/index";
import { REMOTE_INDIKATOR } from "@myTypes/entity/indikator";
import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
	const cookie = req.cookies;
	const hostname = req.nextUrl.hostname;
	const body = await req.json();
	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.post(`${REMOTE_INDIKATOR}`, body, {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.indikator.post",
			new Date().toString(),
			err.response?.data,
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};
