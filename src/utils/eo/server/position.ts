import { REMOTE_POSITION } from "@myTypes/entity/position";
import axios from "axios";

export const getPosInList = async (postsId: string) => {
	try {
		const { data } = await axios.get(`${REMOTE_POSITION}/in/${postsId}`);
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
