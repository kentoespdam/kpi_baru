import { appwriteHeader, getCurrentToken } from "@helper/index";
import { REMOTE_PERILAKU } from "@myTypes/entity/perilaku";
import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;
	const search = req.nextUrl.search;

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.get(
			`${REMOTE_PERILAKU}/page${search}`,
			{
				headers: appwriteHeader(cookie, token),
			}
		);
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log("api.perilaku.get", new Date().toString(), e.response.data);
	}
};
export const POST = async (req: NextRequest) => {
	const cookie = req.cookies;
	const body = req.body;
	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.post(`${REMOTE_PERILAKU}`, body, {
			headers: appwriteHeader(cookie, token),
		});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log(
			"api.perilaku.post.id",
			new Date().toString(),
			e.response.data
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
