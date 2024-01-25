import { getCurrentToken } from "@helper/index";
import { REMOTE_URAIAN_FILE } from "@myTypes/entity/uraian.file";
import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";

export const revalidate = 0;

export const DELETE = async (
	req: NextRequest,
	{ params }: { params: { id: number } },
) => {
	const { id } = params;
	const hostname = req.nextUrl.hostname;
	const cookies = req.cookies;

	try {
		const token = await getCurrentToken(cookies, hostname);
		const { status, data } = await axios.delete(`${REMOTE_URAIAN_FILE}/${id}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			responseType: "stream",
		});

		return new Response(data, {
			status: status,
		});
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.kpi.file.delete.id",
			new Date().toISOString(),
			"Error Delete code",
			err.response?.status,
		);
		return new Response(JSON.stringify({ message: "Delete file Failed!" }), {
			status: 500,
		});
	}
};
