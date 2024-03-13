import { getCurrentToken } from "@helper/index";
import { DetEmployee } from "@myTypes/entity/det.employee";
import { Employee, REMOTE_EMPLOYEE } from "@myTypes/entity/employee";
import { useCetakStore } from "@store/server/cetak";
import axios, { AxiosError } from "axios";
import { cookies, headers } from "next/headers";

export const getBiodata = async (nipam: string) => {
	const cookie = cookies();
	const headerList = headers();
	const hostname = String(headerList.get("host")).split(":")[0]

	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.get(
			`${REMOTE_EMPLOYEE}/${nipam}/nipam`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			}
		);
		if (status !== 200) return null;
		const emp = data.data satisfies Employee;
		const posParent = emp.position.parent;
		const { data: atasanData } = await axios.get(
			`${REMOTE_EMPLOYEE}/${posParent}/position`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			}
		);
		const detEmp: DetEmployee = {
			curr: data.data,
			atasan: atasanData.data,
		};
		useCetakStore.setState({ biodata: detEmp });
		return detEmp;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"cetak.kpi.biodata",
			new Date().toISOString(),
			err.response?.data
		);
		return null;
	}
};
