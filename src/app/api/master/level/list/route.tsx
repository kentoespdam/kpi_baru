import { getCurrentToken } from "@helper/index";
import { REMOTE_LEVEL } from "@myTypes/entity/level";
import axios from "axios";
import { NextRequest } from "next/server";

export const revalidate = 0;

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.get(`${REMOTE_LEVEL}`, {
			headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
		});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log(
			"api.level.list.get",
			new Date().toString(),
			e.response.data
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
