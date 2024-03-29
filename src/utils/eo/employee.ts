import { LOCAL_EMPLOYEE } from "@myTypes/entity/employee";
import axios from "axios";

export const getList = async (props: any) => {
	const orgCode = props[1].orgCode;
	try {
		const { data } = await axios.get(
			`${LOCAL_EMPLOYEE}/organization/${orgCode}`
		);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.indikator.list",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const getEmpDetails = async (props: any) => {
	const { queryKey } = props;
	const nipam = queryKey[1];

	try {
		const { data } = await axios.get(`${LOCAL_EMPLOYEE}/nipam/${nipam}`);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.indikator.list",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};
