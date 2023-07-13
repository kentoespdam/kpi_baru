import { LOCAL_LEVEL } from "@myTypes/entity/level";
import axios from "axios";

export const getPage = async (props: any) => {
	const { pageRequest, sortRequest, level, status } = props[1];
	const params = new URLSearchParams();
	params.set("page", pageRequest.page);
	params.set("size", pageRequest.size);

	if (sortRequest.sort) {
		params.set("sort", sortRequest.sort);
		params.set("direction", sortRequest.direction);
	}
	if (level) params.set("level", level);
	if (status) params.set("status", status);

	try {
		const { data } = await axios.get(`${LOCAL_LEVEL}?${params.toString()}`);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.level.page",
			new Date().toISOString(),
			e.response.data
		);
	}

	return [];
};
