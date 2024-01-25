import { getCurrentToken } from "@helper/index";
import { REMOTE_TRANS_KPI } from "@myTypes/entity/trans.kpi";
import { useCetakStore } from "@store/server/cetak";
import axios from "axios";
import { cookies } from "next/headers";

export const getKpiData = async (
	nipam: string,
	periode: number,
	kpiId: number
) => {
	const cookie = cookies();
	try {
		const token = await getCurrentToken(cookie, hostname);
		const { status, data } = await axios.get(
			`${REMOTE_TRANS_KPI}/${periode}/periode/${nipam}/nipam/${kpiId}/kpi`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			}
		);
		if (status !== 200) return null;
		useCetakStore.setState({ kpiData: data.data });
		return data.data;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"cetak.kpi",
			new Date().toISOString(),
			err.response?.data,
		);
		return null;
	}
};
