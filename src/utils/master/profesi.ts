import { LOCAL_PROFESI, ProfesiData } from "@myTypes/entity/profesi";
import { useProfesiStore } from "@store/filter/master/profesi";
import axios, { AxiosError } from "axios";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
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
	if (profesiData.name) params.set("name", profesiData.name);
	if (profesiData.status) params.set("status", profesiData.status);
	if (profesiData.level) params.set("levelId", profesiData.level.id);

	useProfesiStore.setState({ loading: true });
	try {
		const { data } = await axios.get(`${LOCAL_PROFESI}?${params.toString()}`);
		useProfesiStore.setState({ loading: false });
		return data.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.master.profesi.page",
			new Date().toISOString(),
			err.response?.data,
		);
		useProfesiStore.setState({ loading: false });
		throw new Error(JSON.stringify(err.response?.data));
	}
};

export const getList = async () => {
	try {
		const { data } = await axios.get(`${LOCAL_PROFESI}/list`);
		return data.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.master.profesi.list",
			new Date().toISOString(),
			err.response?.data,
		);
		throw new Error(JSON.stringify(err.response?.data));
	}
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getById = async (props: any) => {
	const id = props[1];
	useProfesiStore.setState({ loading: true });
	try {
		const { data } = await axios.get(`${LOCAL_PROFESI}/${id}`);
		useProfesiStore.setState({ loading: false });
		return data.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.master.profesi.getById",
			new Date().toISOString(),
			err.response?.data,
		);
		useProfesiStore.setState({ loading: false });
		throw new Error(JSON.stringify(err.response?.data));
	}
};

export const doSave = async (data: ProfesiData) => {
	useProfesiStore.setState({ loading: true });
	try {
		const result = data.id
			? await axios.put(`${LOCAL_PROFESI}/${data.id}`, data)
			: await axios.post(LOCAL_PROFESI, data);
		useProfesiStore.setState({ loading: false });
		return result.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.master.profesi.save",
			new Date().toISOString(),
			err.response?.data,
		);
		useProfesiStore.setState({ loading: false });
		throw new Error(JSON.stringify(err.response?.data));
	}
};

export const doDelete = async (id: number) => {
	useProfesiStore.setState({ loading: true });
	try {
		const result = await axios.delete(`${LOCAL_PROFESI}/${id}`);
		useProfesiStore.setState({ loading: false });
		return result.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.master.profesi.delete",
			new Date().toISOString(),
			err.response?.data,
		);
		useProfesiStore.setState({ loading: false });
		throw new Error(JSON.stringify(err.response?.data));
	}
};
