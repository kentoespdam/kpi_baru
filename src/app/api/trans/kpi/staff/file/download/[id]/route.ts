import { getCurrentToken } from "@helper/index";
import { REMOTE_URAIAN_FILE } from "@myTypes/entity/uraian.file";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: number } }
) => {
	const { id } = params;
	const cookies = req.cookies;

	try {
		const token = await getCurrentToken(cookies);
		const { status, data, headers } = await axios.get(
			`${REMOTE_URAIAN_FILE}/${id}/file`,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
				responseType: "stream",
			}
		);

		return new Response(data, {
			status: status,
			headers: headers as HeadersInit,
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
