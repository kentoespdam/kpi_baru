import { getCurrentToken } from "@helper/index";
import { REMOTE_SATUAN } from "@myTypes/entity/satuan";
import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;
	const hostname = req.nextUrl.hostname;
	const search = req.nextUrl.search;

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.get(`${REMOTE_SATUAN}/page${search}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log("api.satuan.get", new Date().toString(), err.response?.data);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};

export const POST = async (req: NextRequest) => {
	const cookie = req.cookies;
	const hostname = req.nextUrl.hostname;
	const body = await req.json();

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.post(`${REMOTE_SATUAN}`, body, {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log("api.satuan.post", new Date().toString(), err.response?.data);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};
