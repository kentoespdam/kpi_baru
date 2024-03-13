import { LOCAL_POSITION } from "@myTypes/entity/position";
import axios, { AxiosError } from "axios";

export const getList = async () => {
	try {
		const { status, data } = await axios.get(`${LOCAL_POSITION}/list`);
		return data.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log("utils.eo.position.list", new Date().toISOString(), err.response?.data);
		throw new Error(JSON.stringify(err.response?.data));
	}
};
