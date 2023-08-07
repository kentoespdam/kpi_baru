import { getCurrentToken, appwriteHeader } from "@helper/index";
import { REMOTE_URAIAN_FILE } from "@myTypes/entity/uraian.file";
import axios from "axios";
import { NextRequest } from "next/server";

export const revalidate = 0;

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: number } }
) => {
	const { id } = params;
	const cookies = req.cookies;

	try {
		const token = await getCurrentToken(cookies);
		const { status, data } = await axios.get(
			`${REMOTE_URAIAN_FILE}/${id}/uraian`,
			{
				headers: appwriteHeader(cookies, token),
				responseType: "stream",
			}
		);

		return new Response(data, {
			status: status,
			headers: data.headers,
		});
	} catch (e: any) {
		console.log(
			"api.kpi.file.download.id",
			new Date().toISOString(),
			e.response.data.message
		);
		return new Response(e.response.data.message, { status: 500 });
	}
};
