import { UraianData, UraianFilter, LOCAL_URAIAN } from "@myTypes/entity/uraian";
import { useUraianStore } from "@store/filter/master/uraian";
import axios, { AxiosError } from "axios";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getPage = async (props: any) => {
	const { queryKey } = props;

	const { pageRequest, sortRequest } = queryKey[1];
	const filter = queryKey[2] satisfies UraianFilter;
	const params = new URLSearchParams();
	params.set("page", pageRequest.page);
	params.set("size", pageRequest.size);

	if (sortRequest.sort) {
		params.set("sort", sortRequest.sort);
		params.set("direction", sortRequest.direction);
	}
	if (filter.uraian) params.set("uraian", filter.uraian);
	if (filter.kpiId) params.set("kpiId", filter.kpiId);
	if (filter.profesiId) params.set("profesiId", filter.profesiId);
	if (filter.profesiId) params.set("profesiId", filter.profesiId);
	if (filter.profesiId) params.set("profesiId", filter.profesiId);
	if (filter.levelId) params.set("levelId", filter.levelId);
	if (filter.status) params.set("status", filter.status);

	useUraianStore.setState({ loading: true });

	try {
		const { data } = await axios.get(
			`${LOCAL_URAIAN}/indikator/${filter.indikatorId}?${params.toString()}`,
		);
		useUraianStore.setState({ loading: false });
		return data.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.master.uraian.page",
			new Date().toISOString(),
			err.response?.data,
		);
		useUraianStore.setState({ loading: false });
		throw new Error(JSON.stringify(err.response?.data));
	}
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getById = async (props: any) => {
	const id = props[1];
	useUraianStore.setState({ loading: true });
	try {
		const { data } = await axios.get(`${LOCAL_URAIAN}/${id}`);
		useUraianStore.setState({ loading: false });
		return data.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.master.uraian.getById",
			new Date().toISOString(),
			err.response?.data,
		);
		useUraianStore.setState({ loading: false });
		throw new Error(JSON.stringify(err.response?.data));
	}
};

export const doSave = async (data: UraianData) => {
	useUraianStore.setState({ loading: true });
	try {
		const result = data.id
			? await axios.put(`${LOCAL_URAIAN}/${data.id}`, data)
			: await axios.post(LOCAL_URAIAN, data);
		useUraianStore.setState({ loading: false });
		return result.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.master.uraian.save",
			new Date().toISOString(),
			err.response?.data,
		);
		useUraianStore.setState({ loading: false });
		throw new Error(JSON.stringify(err.response?.data));
	}
};

export const doDelete = async (id: number) => {
	useUraianStore.setState({ loading: true });
	try {
		const result = await axios.delete(`${LOCAL_URAIAN}/${id}`);
		useUraianStore.setState({ loading: false });
		return result.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.master.uraian.delete",
			new Date().toISOString(),
			err.response?.data,
		);
		useUraianStore.setState({ loading: false });
		throw new Error(JSON.stringify(err.response?.data));
	}
};
