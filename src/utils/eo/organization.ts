import { LOCAL_ORGANIZATION } from "@myTypes/entity/organization";
import axios, { AxiosError } from "axios";

export const getList = async () => {
	try {
		const { data } = await axios.get(`${LOCAL_ORGANIZATION}/list`);
		return data.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.eo.organization.list",
			new Date().toISOString(),
			err.response?.data,
		);
		throw new Error(JSON.stringify(err.response?.data));
	}
};
