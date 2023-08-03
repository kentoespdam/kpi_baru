import { LOCAL_POSITION } from "@myTypes/entity/position";
import axios from "axios";

export const getList = async () => {
	try {
		const { status, data } = await axios.get(`${LOCAL_POSITION}/list`);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.eo.position.list",
			new Date().toISOString(),
			e.response
		);
		throw new Error(e.response.data.message);
	}
};
