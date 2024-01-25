import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken } from "@helper/index";
import { REMOTE_ORGANIZATION } from "@myTypes/entity/organization";
import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;
	const hostname = req.nextUrl.hostname;
	const search = new URLSearchParams();
	search.set("status", "Enabled");

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.get(
			`${REMOTE_ORGANIZATION}/list?${search.toString()}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			},
		);
		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), {
			status,
		});
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.eo.organization.list.get",
			new Date().toString(),
			err.response?.data,
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};
