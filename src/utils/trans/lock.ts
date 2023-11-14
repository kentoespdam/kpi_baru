import {
	LOCAL_TRANS_LOCK,
	LockKpiData,
} from "@myTypes/entity/trans.accepted.kpi";
import axios from "axios";

export const lockKpi = async (formData: LockKpiData) => {
	try {
		const { data } = await axios.put(
			`${LOCAL_TRANS_LOCK}/${formData.id}`,
			formData
		);
		return data.data;
	} catch (e: any) {
		console.log(
			"trans.accepted.kpi.lock",
			new Date().toISOString(),
			e.response.data.message
		);
		throw new Error(e.response.data.message);
	}
};

export const unlockKpi = async (id: number) => {
	try {
		const { data } = await axios.delete(`${LOCAL_TRANS_LOCK}/${id}`);
		return data.data;
	} catch (e: any) {
		console.log(
			"trans.accepted.kpi.unlock",
			new Date().toISOString(),
			e.response.data.message
		);
		throw new Error(e.response.data.message);
	}
};
