import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken } from "@helper/index";
import { REMOTE_EMPLOYEE } from "@myTypes/entity/employee";
import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: number } }
) => {
	const { id } = params;
	const cookie = req.cookies;

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.get(
			`${REMOTE_EMPLOYEE}/${id}/organization`,
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
			"api.eo.employee.organization.get",
			new Date().toString(),
			e.response.data
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
