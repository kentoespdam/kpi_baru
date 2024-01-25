import { getCurrentToken } from "@helper/index";
import { REMOTE_PERILAKU } from "@myTypes/entity/perilaku";
import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;
	const hostname = req.nextUrl.hostname;
	const search = req.nextUrl.search;

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.get(
			`${REMOTE_PERILAKU}/page${search}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			},
		);
		return new Response(JSON.stringify(data), { status: status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log("api.perilaku.get", new Date().toString(), err.response?.data);
	}
};
export const POST = async (req: NextRequest) => {
	const cookie = req.cookies;
	const hostname = req.nextUrl.hostname;
	const body = req.body;
	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.post(`${REMOTE_PERILAKU}`, body, {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.perilaku.post.id",
			new Date().toString(),
			err.response?.data,
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};
