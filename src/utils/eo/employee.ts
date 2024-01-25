import { DetEmployee } from "@myTypes/entity/det.employee";
import { LOCAL_EMPLOYEE } from "@myTypes/entity/employee";
import axios, { AxiosError } from "axios";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getList = async (props: any) => {
	const orgCode = props[1].orgCode;
	try {
		const { data } = await axios.get(
			`${LOCAL_EMPLOYEE}/organization/${orgCode}`,
		);
		return data.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.master.indikator.list",
			new Date().toISOString(),
			err.response?.data,
		);
		throw new Error(JSON.stringify(err.response?.data));
	}
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getEmpDetails = async (props: any): Promise<DetEmployee> => {
	const { queryKey } = props;
	const nipam = queryKey[1];

	try {
		const { data } = await axios.get(`${LOCAL_EMPLOYEE}/nipam/${nipam}`);
		return data.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.master.indikator.list",
			new Date().toISOString(),
			err.response?.data,
		);
		throw new Error(JSON.stringify(err.response?.data));
	}
};
