import {
	BridgePerilakuData,
	LOCAL_BRIDGE_PERILAKU,
} from "@myTypes/entity/bridge.perilaku";
import axios from "axios";

export const getPage = async (props: any) => {
	const { queryKey } = props;

	const { pageRequest, sortRequest } = queryKey[1];
	const params = new URLSearchParams();
	params.set("page", pageRequest.page);
	params.set("size", pageRequest.size);
	if (sortRequest.sort) {
		params.set("sort", sortRequest.sort);
		params.set("direction", sortRequest.direction);
	}
	const { perilaku, level, status } = queryKey[2];
	if (perilaku) params.set("perilakuId", perilaku.id);
	if (level) params.set("levelId", level.id);
	if (status) params.set("status", status);

	try {
		const { data } = await axios.get(
			`${LOCAL_BRIDGE_PERILAKU}?${params.toString()}`
		);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.bridge.perilaku.page",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};
export const getList = async () => {};
export const getById = async (props: any) => {};
export const doSave = async (data: BridgePerilakuData) => {};
export const doDelete = async (id: number) => {};
