import { getCurrentToken } from "@helper/index";
import { REMOTE_SATUAN } from "@myTypes/entity/satuan";
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
		const { status, data } = await axios.get(`${REMOTE_SATUAN}/${id}`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": token,
			},
		});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log("api.satuan.get", new Date().toString(), e.response.data);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
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
			`${REMOTE_SATUAN}/${id}`,
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
			"api.satuan.put.id",
			new Date().toString(),
			e.response.data
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
	const cookie = req.cookies;
	const { id } = params;

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.delete(`${REMOTE_SATUAN}/${id}`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": token,
			},
		});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log(
			"api.satuan.delete",
			new Date().toString(),
			e.response.data
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
