import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken } from "@helper/index";
import { REMOTE_POSITION } from "@myTypes/entity/position";
import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;
	const search = new URLSearchParams();
	search.set("status", "Enabled");

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.get(
			`${REMOTE_POSITION}/list?${search.toString()}`,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
			}
		);
		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), {
			status,
		});
	} catch (e: any) {
		console.log(
			"api.eo.position.list.get",
			new Date().toString(),
			e.response.data
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
