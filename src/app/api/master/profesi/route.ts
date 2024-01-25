import { getCurrentToken } from "@helper/index";
import { REMOTE_PROFESI } from "@myTypes/entity/profesi";
import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";

export const revalidate = 0;

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;
	const hostname = req.nextUrl.hostname;
	const search = req.nextUrl.search;

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.get(
			`${REMOTE_PROFESI}/page${search}`,
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
		console.log("api.profesi.get", new Date().toString(), err.response?.data);
	}
};

export const POST = async (req: NextRequest) => {
	const cookie = req.cookies;
	const hostname = req.nextUrl.hostname;
	const body = req.body;
	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.post(`${REMOTE_PROFESI}`, body, {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.profesi.post.id",
			new Date().toString(),
			err.response?.data,
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};
