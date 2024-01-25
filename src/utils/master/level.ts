import { LOCAL_LEVEL, LevelData } from "@myTypes/entity/level";
import axios from "axios";

export const getPage = async (props: any) => {
	const { queryKey } = props;

	const { pageRequest, sortRequest, level, status } = queryKey[1];
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
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"utils.master.level.page",
			new Date().toISOString(),
			err.response?.data
		);

		throw new Error(err.response?.data,);
	}
};

export const getLevelList = async () => {
	try {
		const { data } = await axios.get(`${LOCAL_LEVEL}/list?status=Enabled`);

		return data.data;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"utils.master.level.list",
			new Date().toISOString(),
			err.response?.data
		);

		throw new Error(err.response?.data,);
	}
};

export const getById = async (props: any) => {
	const id = props[1];

	try {
		const { data } = await axios.get(`${LOCAL_LEVEL}/${id}`);

		return data.data;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"utils.master.level.getById",
			new Date().toISOString(),
			err.response?.data
		);

		throw new Error(err.response?.data,);
	}
};

export const doSave = async (data: LevelData) => {
	try {
		const result = data.id
			? await axios.put(`${LOCAL_LEVEL}/${data.id}`, data)
			: await axios.post(LOCAL_LEVEL, data);

		return result.data;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"utils.master.level.save",
			new Date().toISOString(),
			err.response?.data
		);

		throw new Error(err.response?.data,);
	}
};

export const doDelete = async (id: number) => {
	try {
		const result = await axios.delete(`${LOCAL_LEVEL}/${id}`);

		return result.data;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"utils.master.level.delete",
			new Date().toISOString(),
			err.response?.data
		);

		throw new Error(err.response?.data,);
	}
};
