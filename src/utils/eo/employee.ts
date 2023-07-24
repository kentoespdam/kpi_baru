import { LOCAL_EMPLOYEE } from "@myTypes/entity/employee";
import axios from "axios";

export const getList = async (props: any) => {
	const orgCode = props[1].orgCode;
	console.log(orgCode);
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
