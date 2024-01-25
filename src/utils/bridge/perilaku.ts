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
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"utils.bridge.perilaku.page",
			new Date().toISOString(),
			err.response?.data
		);
		throw new Error(err.response?.data,);
	}
};
export const getList = async () => {};
export const getById = async (props: any) => {
	const id = props[1];
	try {
		const { data } = await axios.get(`${LOCAL_BRIDGE_PERILAKU}/${id}`);
		return data.data;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"utils.bridge.perilaku.id",
			new Date().toISOString(),
			err.response?.data
		);
		throw new Error(err.response?.data,);
	}
};
export const doSave = async (data: BridgePerilakuData) => {
	try {
		const result = data.id
			? await axios.put(`${LOCAL_BRIDGE_PERILAKU}/${data.id}`, data)
			: await axios.post(LOCAL_BRIDGE_PERILAKU, data);
		return result.data;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"utils.bridge.kpi.save",
			new Date().toISOString(),
			err.response?.data
		);
		throw new Error(err.response?.data,);
	}
};
export const doDelete = async (id: number) => {
	try {
		const { data } = await axios.delete(`${LOCAL_BRIDGE_PERILAKU}/${id}`);
		return data.data;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"utils.bridge.kpi.getById",
			new Date().toISOString(),
			err.response?.data
		);
		throw new Error(err.response?.data,);
	}
};
