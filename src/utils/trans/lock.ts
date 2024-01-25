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
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"trans.accepted.kpi.lock",
			new Date().toISOString(),
			err.response?.data,
		);
		throw new Error(err.response?.data,);
	}
};

export const unlockKpi = async (id: number) => {
	try {
		const { data } = await axios.delete(`${LOCAL_TRANS_LOCK}/${id}`);
		return data.data;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"trans.accepted.kpi.unlock",
			new Date().toISOString(),
			err.response?.data,
		);
		throw new Error(err.response?.data,);
	}
};
