import { appwriteHeader, getCurrentToken, setCookieToken } from "@helper/index";
import { REMOTE_LEVEL } from "@myTypes/entity/level";
import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: number } }
) => {
	const cookie = req.cookies;
	const { id } = params;
	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.get(`${REMOTE_LEVEL}/${id}`, {
			headers: appwriteHeader(cookie, token),
		});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log("api.level.get.id", new Date().toString(), e.response.data);
	}
};

export const PUT = async (
	req: NextRequest,
	{ params }: { params: { id: number } }
) => {
	const cookie = req.cookies;
	const { id } = params;
	const body = await req.json();
	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.put(
			`${REMOTE_LEVEL}/${id}`,
			body,
			{
				headers: appwriteHeader(cookie, token),
			}
		);
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log("api.level.put.id", new Date().toString(), e.response.data);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};

export const DELETE = async (
	req: NextRequest,
	{ params }: { params: { id: number } }
) => {
	const cookie = req.cookies;
	const { id } = params;
	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.delete(`${REMOTE_LEVEL}/${id}`, {
			headers: appwriteHeader(cookie, token),
		});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log(
			"api.level.delete.id",
			new Date().toString(),
			e.response.data
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
