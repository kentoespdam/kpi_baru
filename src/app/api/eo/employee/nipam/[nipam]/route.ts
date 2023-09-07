import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken } from "@helper/index";
import { DetEmployee } from "@myTypes/entity/det.employee";
import { Employee, REMOTE_EMPLOYEE } from "@myTypes/entity/employee";
import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { nipam: number } }
) => {
	const { nipam } = params;
	const cookie = req.cookies;

	try {
		const token = await getCurrentToken(cookie);
		const { status, data, statusText } = await axios.get(
			`${REMOTE_EMPLOYEE}/${nipam}/nipam`,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
			}
		);
		const emp = data.data satisfies Employee;
		const posParent = emp.position.parent;
		const posId = emp.position.id;
		const [atasanData, staffData] = await Promise.all([
			await axios.get(`${REMOTE_EMPLOYEE}/${posParent}/position`, {
				headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
			}),
			await axios.get(`${REMOTE_EMPLOYEE}/${posId}/staff`, {
				headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
			}),
		]);

		const detEmp: DetEmployee = {
			curr: data.data,
			atasan: atasanData.data.data,
			staff: staffData.data.data,
		};
		if (status === 204) return responseNoContent();
		return new Response(
			JSON.stringify({ data: detEmp, status: statusText }),
			{
				status,
			}
		);
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
