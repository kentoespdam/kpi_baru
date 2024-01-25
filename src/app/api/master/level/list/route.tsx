import { getCurrentToken } from "@helper/index";
import { REMOTE_LEVEL } from "@myTypes/entity/level";
import axios, { AxiosError } from "axios";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const revalidate = 0;

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;
	const headerList = headers();
	const hostname = String(headerList.get("host")).split(":")[0];

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.get(`${REMOTE_LEVEL}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.level.list.get",
			new Date().toString(),
			err.response?.data
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};
