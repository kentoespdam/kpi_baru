import { LOCAL_SATUAN, SatuanData } from "@myTypes/entity/satuan";
import axios, { AxiosError } from "axios";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
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
		const { data } = await axios.get(`${LOCAL_SATUAN}?${params.toString()}`);
		return data.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.master.satuan.page",
			new Date().toISOString(),
			err.response?.data,
		);
		throw new Error(JSON.stringify(err.response?.data));
	}
};

export const getList = async () => {
	try {
		const { data } = await axios.get(`${LOCAL_SATUAN}/list`);
		return data.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.master.satuan.list",
			new Date().toISOString(),
			err.response?.data,
		);
		throw new Error(JSON.stringify(err.response?.data));
	}
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getById = async (props: any) => {
	const id = props[1];

	try {
		const { data } = await axios.get(`${LOCAL_SATUAN}/${id}`);
		return data.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.master.satuan.getById",
			new Date().toISOString(),
			err.response?.data,
		);
		throw new Error(JSON.stringify(err.response?.data));
	}
};

export const doSave = async (formData: SatuanData) => {
	console.log("executed?");
	try {
		const result = formData.id
			? await axios.put(`${LOCAL_SATUAN}/${formData.id}`, formData)
			: await axios.post(LOCAL_SATUAN, formData);
		return result.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.master.satuan.save",
			new Date().toISOString(),
			err.response?.data,
		);
		throw new Error(JSON.stringify(err.response?.data));
	}
};

export const doDelete = async (id: number) => {
	try {
		const result = await axios.delete(`${LOCAL_SATUAN}/${id}`);
		return result.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.master.satuan.delete",
			new Date().toISOString(),
			err.response?.data,
		);
		throw new Error(JSON.stringify(err.response?.data));
	}
};
