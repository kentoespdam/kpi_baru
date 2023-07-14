import { LOCAL_PROFESI, ProfesiData } from "@myTypes/entity/profesi";
import axios from "axios";

export const getPage = async (props: any) => {
	const { queryKey } = props;

	const { pageRequest, sortRequest } = queryKey[1];
	const profesiData = queryKey[2] satisfies ProfesiData;
	const params = new URLSearchParams();
	params.set("page", pageRequest.page);
	params.set("size", pageRequest.size);

	if (sortRequest.sort) {
		params.set("sort", sortRequest.sort);
		params.set("direction", sortRequest.direction);
	}
	if (profesiData.name) params.set("profesi", profesiData.name);
	if (profesiData.status) params.set("status", profesiData.status);
	if (profesiData.level) params.set("levelId", profesiData.level.id);

	try {
		const { data } = await axios.get(
			`${LOCAL_PROFESI}?${params.toString()}`
		);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.profesi.page",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const getById = async (props: any) => {
	const id = props[1];
	try {
		const { data } = await axios.get(`${LOCAL_PROFESI}/${id}`);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.profesi.getById",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const doSave = async (data: ProfesiData) => {
	try {
		const result = data.id
			? await axios.put(`${LOCAL_PROFESI}/${data.id}`, data)
			: await axios.post(LOCAL_PROFESI, data);
		return result.data;
	} catch (e: any) {
		console.log(
			"utils.master.profesi.save",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const doDelete = async (id: number) => {
	try {
		const result = await axios.delete(`${LOCAL_PROFESI}/${id}`);
		return result.data;
	} catch (e: any) {
		console.log(
			"utils.master.profesi.delete",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};
