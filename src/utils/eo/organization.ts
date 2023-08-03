import { LOCAL_ORGANIZATION } from "@myTypes/entity/organization";
import axios from "axios";

export const getList = async () => {
	try {
		const { status, data } = await axios.get(`${LOCAL_ORGANIZATION}/list`);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.eo.organization.list",
			new Date().toISOString(),
			e.response
		);
		throw new Error(e.response.data.message);
	}
};
