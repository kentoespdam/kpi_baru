import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken } from "@helper/index";
import { REMOTE_TRANS_URAIAN } from "@myTypes/entity/trans.uraian";
import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";

export const revalidate = 0;

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: number } },
) => {
	const cookies = req.cookies;
	const hostname = req.nextUrl.hostname;
	const { id } = params;

	try {
		const token = await getCurrentToken(cookies, hostname);
		const { status, data } = await axios.get(`${REMOTE_TRANS_URAIAN}/${id}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), { status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.trans.uraian.id",
			new Date().toISOString(),
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
	const cookies = req.cookies;
	const hostname = req.nextUrl.hostname;
	const { id } = params;
	const body = await req.json();

	try {
		const token = await getCurrentToken(cookies, hostname);
		const { status, data } = await axios.put(
			`${REMOTE_TRANS_URAIAN}/${id}`,
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
			"api.trans.uraian.put",
			new Date().toISOString(),
			err.response?.data,
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};
