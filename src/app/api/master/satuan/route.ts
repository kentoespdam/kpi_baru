import { getCurrentToken } from "@helper/index";
import { REMOTE_SATUAN } from "@myTypes/entity/satuan";
import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;
	const search = req.nextUrl.search;

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.get(
			`${REMOTE_SATUAN}/page${search}`,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
			}
		);
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log("api.satuan.get", new Date().toString(), e.response.data);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};

export const POST = async (req: NextRequest) => {
	const cookie = req.cookies;
	const body = await req.json();

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.post(`${REMOTE_SATUAN}`, body, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": token,
			},
		});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log("api.satuan.post", new Date().toString(), e.response.data);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
