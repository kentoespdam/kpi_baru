import { LOCAL_PERILAKU, PerilakuData } from "@myTypes/entity/perilaku";
import { useGradeStore } from "@store/filter/master/grade";
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
		params.set("kompetensi", perilakuData.kompetensi);
	if (perilakuData.uraian) params.set("uraian", perilakuData.uraian);

	useGradeStore.setState({ loading: true });

	try {
		const { data } = await axios.get(
			`${LOCAL_PERILAKU}?${params.toString()}`
		);
		useGradeStore.setState({ loading: false });
		return data.data;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"utils.master.perilaku.page",
			new Date().toISOString(),
			err.response?.data
		);
		useGradeStore.setState({ loading: false });
		throw new Error(err.response?.data,);
	}
};

export const getList = async () => {
	try {
		const { data } = await axios.get(`${LOCAL_PERILAKU}/list`);
		useGradeStore.setState({ loading: false });
		return data.data;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"utils.master.perilaku.page",
			new Date().toISOString(),
			err.response?.data
		);
		useGradeStore.setState({ loading: false });
		throw new Error(err.response?.data,);
	}
};

export const getById = async (props: any) => {
	const id = props[1];
	console.log(props);
	try {
		const { data } = await axios.get(`${LOCAL_PERILAKU}/${id}`);
		useGradeStore.setState({ loading: false });
		return data.data;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"utils.master.perilaku.getById",
			new Date().toISOString(),
			err.response?.data
		);
		useGradeStore.setState({ loading: false });
		throw new Error(err.response?.data,);
	}
};

export const doSave = async (data: PerilakuData) => {
	useGradeStore.setState({ loading: true });
	try {
		const result = data.id
			? await axios.put(`${LOCAL_PERILAKU}/${data.id}`, data)
			: await axios.post(LOCAL_PERILAKU, data);
		useGradeStore.setState({ loading: false });
		return result.data;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"utils.master.perilaku.save",
			new Date().toISOString(),
			err.response?.data
		);
		useGradeStore.setState({ loading: false });
		throw new Error(err.response?.data,);
	}
};

export const doDelete = async (id: number) => {
	useGradeStore.setState({ loading: true });
	try {
		const result = await axios.delete(`${LOCAL_PERILAKU}/${id}`);
		useGradeStore.setState({ loading: false });
		return result.data;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"utils.master.perilaku.delete",
			new Date().toISOString(),
			err.response?.data
		);
		useGradeStore.setState({ loading: false });
		throw new Error(err.response?.data,);
	}
};
