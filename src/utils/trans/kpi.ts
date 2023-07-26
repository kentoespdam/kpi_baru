import { LOCAL_TRANS_KPI } from "@myTypes/entity/trans.kpi";
import axios from "axios";

export const getStaffKpi = async (props: any) => {
	const { queryKey } = props;
	const { nipam, periode, kpiId } = queryKey[1];

	try {
		const { data } = await axios.get(
			`${LOCAL_TRANS_KPI}/staff/${nipam}/${periode}/${kpiId}`
		);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.trans.kpi.staff",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};
