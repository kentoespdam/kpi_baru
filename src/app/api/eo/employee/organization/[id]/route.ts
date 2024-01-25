import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken } from "@helper/index";
import { REMOTE_EMPLOYEE } from "@myTypes/entity/employee";
import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";
import { headers } from "next/headers";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: number } },
) => {
	const cookie = req.cookies;
	const headerList = headers();
	const hostname = String(headerList.get("host")).split(":")[0];
	const { id } = params;

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.get(
			`${REMOTE_EMPLOYEE}/${id}/organization`,
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
			"api.eo.employee.organization.get",
			new Date().toString(),
			err.response?.data,
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};
