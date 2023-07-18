import { LOCAL_PERILAKU, PerilakuData } from "@myTypes/entity/perilaku";
import axios from "axios";

export const getPage = async (props: any) => {
	const { queryKey } = props;

	const { pageRequest, sortRequest } = queryKey[1];
	const perilakuData = queryKey[2] satisfies PerilakuData; // status, kompetensi, uraian
	const params = new URLSearchParams();
	params.set("page", pageRequest.page);
	params.set("size", pageRequest.size);

	if (sortRequest.sort) {
		params.set("sort", sortRequest.sort);
		params.set("direction", sortRequest.direction);
	}
	if (perilakuData.status) params.set("status", perilakuData.status);
	if (perilakuData.kompetensi)
		params.set("perilaku", perilakuData.kompetensi);
	if (perilakuData.uraian) params.set("status", perilakuData.uraian);

	try {
		const { data } = await axios.get(
			`${LOCAL_PERILAKU}?${params.toString()}`
		);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.perilaku.page",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const getById = async (props: any) => {
	const id = props[1];
	try {
		const { data } = await axios.get(`${LOCAL_PERILAKU}/${id}`);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.perilaku.getById",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const doSave = async (data: PerilakuData) => {
	try {
		const result = data.id
			? await axios.put(`${LOCAL_PERILAKU}/${data.id}`, data)
			: await axios.post(LOCAL_PERILAKU, data);
		return result.data;
	} catch (e: any) {
		console.log(
			"utils.master.perilaku.save",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const doDelete = async (id: number) => {
	try {
		const result = await axios.delete(`${LOCAL_PERILAKU}/${id}`);
		return result.data;
	} catch (e: any) {
		console.log(
			"utils.master.perilaku.delete",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};
