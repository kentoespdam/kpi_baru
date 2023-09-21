import { getCurrentToken } from "@helper/index";
import { REMOTE_URAIAN_FILE } from "@myTypes/entity/uraian.file";
import axios from "axios";
import { NextRequest } from "next/server";

export const revalidate = 0;

export const DELETE = async (
	req: NextRequest,
	{ params }: { params: { id: number } }
) => {
	const { id } = params;
	const cookies = req.cookies;

	try {
		const token = await getCurrentToken(cookies);
		const { status, data } = await axios.delete(
			`${REMOTE_URAIAN_FILE}/${id}`,
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
		});
	} catch (e: any) {
		console.log(
			"api.kpi.file.delete.id",
			new Date().toISOString(),
			"Error Delete code",
			e.response.status
		);
		return new Response(
			JSON.stringify({ message: "Delete file Failed!" }),
			{ status: 500 }
		);
	}
};
