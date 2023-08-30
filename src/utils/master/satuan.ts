import { LOCAL_SATUAN, SatuanData } from "@myTypes/entity/satuan";
import axios from "axios";

export const getPage = async (props: any) => {
	const { queryKey } = props;

	const { pageRequest, sortRequest, status, satuan } = queryKey[1];
	const params = new URLSearchParams();
	params.set("page", pageRequest.page);
	params.set("size", pageRequest.size);

	if (sortRequest.sort) {
		params.set("sort", sortRequest.sort);
		params.set("direction", sortRequest.direction);
	}
	if (status) params.set("status", status);
	if (satuan) params.set("satuan", satuan);

	try {
		const { data } = await axios.get(
			`${LOCAL_SATUAN}?${params.toString()}`
		);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.satuan.page",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const getList = async (props: any) => {
	try {
		const { data } = await axios.get(`${LOCAL_SATUAN}/list`);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.satuan.list",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const getById = async (props: any) => {
	const id = props[1];

	try {
		const { data } = await axios.get(`${LOCAL_SATUAN}/${id}`);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.satuan.getById",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const doSave = async (formData: SatuanData) => {
	console.log("executed?");
	try {
		const result = formData.id
			? await axios.put(`${LOCAL_SATUAN}/${formData.id}`, formData)
			: await axios.post(LOCAL_SATUAN, formData);
		return result.data;
	} catch (e: any) {
		console.log(
			"utils.master.satuan.save",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const doDelete = async (id: number) => {
	try {
		const result = await axios.delete(`${LOCAL_SATUAN}/${id}`);
		return result.data;
	} catch (e: any) {
		console.log(
			"utils.master.satuan.delete",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};
