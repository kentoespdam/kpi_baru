import { REMOTE_POSITION } from "@myTypes/entity/position";
import axios, { AxiosError } from "axios";

export const getPosInList = async (postsId: string) => {
	try {
		const { data } = await axios.get(`${REMOTE_POSITION}/in/${postsId}`);
		return data.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.eo.position.list",
			new Date().toISOString(),
			err.response?.data,
		);
		throw new Error(JSON.stringify(err.response?.data));
	}
};
