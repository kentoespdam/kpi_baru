import { getCurrentToken } from "@helper/index";
import { REMOTE_PROFESI } from "@myTypes/entity/profesi";
import axios, { AxiosError } from "axios";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const revalidate = 0;

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;
	const headerList = headers();
	const hostname = String(headerList.get("host")).split(":")[0];
	const search = new URLSearchParams();
	search.set("status", "Enabled");

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.get(
			`${REMOTE_PROFESI}?${search}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			}
		);
		return new Response(JSON.stringify(data), { status: status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.master.profesi.list.get",
			new Date().toString(),
			err.response?.data
		);
	}
};
