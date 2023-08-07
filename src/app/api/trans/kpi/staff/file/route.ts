import { appwriteHeader, getCurrentToken } from "@helper/index";
import { REMOTE_URAIAN_FILE } from "@myTypes/entity/uraian.file";
import axios from "axios";
import { NextRequest } from "next/server";

export const revalidate = 0;

export const POST = async (req: NextRequest) => {
	const cookie = req.cookies;
	const body = await req.formData();

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.post(REMOTE_URAIAN_FILE, body, {
			headers: {
				...appwriteHeader(cookie, token),
				"Content-Type": "multipart/form-data",
			},
		});
		return new Response(JSON.stringify(data.data), { status });
	} catch (e: any) {
		console.log(
			"api.trans.kpi.staff.file.post",
			new Date().toISOString(),
			e.response.data.message
		);
		return new Response(e.response.data.message, { status: 400 });
	}
};
