import { getCurrentToken } from "@helper/index";
import { REMOTE_SATUAN } from "@myTypes/entity/satuan";
import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: number } },
) => {
	const cookie = req.cookies;
	const hostname = req.nextUrl.hostname;
	const { id } = params;

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.get(`${REMOTE_SATUAN}/${id}`, {
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

export const PUT = async (
	req: NextRequest,
	{ params }: { params: { id: number } },
) => {
	const cookie = req.cookies;
	const hostname = req.nextUrl.hostname;
	const { id } = params;
	const body = await req.json();

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.put(`${REMOTE_SATUAN}/${id}`, body, {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log("api.satuan.put.id", new Date().toString(), err.response?.data);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};

export const DELETE = async (
	req: NextRequest,
	{ params }: { params: { id: number } },
) => {
	const cookie = req.cookies;
	const hostname = req.nextUrl.hostname;
	const { id } = params;

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.delete(`${REMOTE_SATUAN}/${id}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log("api.satuan.delete", new Date().toString(), err.response?.data);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};
