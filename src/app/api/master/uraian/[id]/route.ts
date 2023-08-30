import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken, appwriteHeader } from "@helper/index";
import { REMOTE_URAIAN } from "@myTypes/entity/uraian";
import axios from "axios";
import { NextRequest } from "next/server";

export const revalidate = 0;

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: number } }
) => {
	const { id } = params;
	const cookie = req.cookies;
	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.get(`${REMOTE_URAIAN}/${id}`, {
			headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
		});
		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log(
			"api.master.uraian.get.id",
			new Date().toISOString(),
			e.response.data.message
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};

export const PUT = async (
	req: NextRequest,
	{ params }: { params: { id: number } }
) => {
	const { id } = params;
	const cookie = req.cookies;
	const body = await req.json();

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.put(
			`${REMOTE_URAIAN}/${id}`,
			body,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
			}
		);
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log(
			"api.master.uraian.put.id",
			new Date().toISOString(),
			e.response.data.message
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};

export const DELETE = async (
	req: NextRequest,
	{ params }: { params: { id: number } }
) => {
	const { id } = params;
	const cookie = req.cookies;
	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.delete(`${REMOTE_URAIAN}/${id}`, {
			headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
		});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log(
			"api.master.uraian.get.id",
			new Date().toISOString(),
			e.response.data.message
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
