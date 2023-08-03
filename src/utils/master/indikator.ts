import {
	Indikator,
	IndikatorData,
	IndikatorFilter,
	IndikatorWithAudit,
	LOCAL_INDIKATOR,
} from "@myTypes/entity/indikator";
import { useIndikatorStore } from "@store/filter/master/indikator";
import axios from "axios";

export const getPage = async (props: any) => {
	const { queryKey } = props;

	const { pageRequest, sortRequest } = queryKey[1];
	const filter = queryKey[2] satisfies IndikatorFilter;
	const params = new URLSearchParams();
	params.set("page", pageRequest.page);
	params.set("size", pageRequest.size);

	if (filter.indikator) params.set("indikator", filter.indikator);
	if (filter.status) params.set("status", filter.status);

	if (sortRequest.sort) {
		params.set("sort", sortRequest.sort);
		params.set("direction", sortRequest.direction);
	}
	if (filter.indikator) params.set("indikator", filter.indikator);
	if (filter.status) params.set("status", filter.status);

	useIndikatorStore.setState({ loading: true });

	try {
		const { data } = await axios.get(
			`${LOCAL_INDIKATOR}/kpi/${filter.kpiId}?${params.toString()}`
		);
		useIndikatorStore.setState({ loading: false });
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.indikator.page",
			new Date().toISOString(),
			e.response.data
		);
		useIndikatorStore.setState({ loading: false });
		throw new Error(e.response.data.message);
	}
};

export const getList = async (props: any): Promise<Indikator[]> => {
	const kpiId = props[1];
	try {
		const { data } = await axios.get(`${LOCAL_INDIKATOR}/list/${kpiId}`);
		useIndikatorStore.setState({ loading: false });
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.indikator.page",
			new Date().toISOString(),
			e.response.data
		);
		useIndikatorStore.setState({ loading: false });
		throw new Error(e.response.data.message);
	}
};

export const getById = async (props: any): Promise<IndikatorWithAudit> => {
	const id = props[1];
	useIndikatorStore.setState({ loading: true });
	try {
		const { data } = await axios.get(`${LOCAL_INDIKATOR}/${id}`);
		useIndikatorStore.setState({ loading: false });
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.indikator.getById",
			new Date().toISOString(),
			e.response.data
		);
		useIndikatorStore.setState({ loading: false });
		throw new Error(e.response.data.message);
	}
};

export const doSave = async (data: IndikatorData) => {
	useIndikatorStore.setState({ loading: true });
	try {
		const result = data.id
			? await axios.put(`${LOCAL_INDIKATOR}/${data.id}`, data)
			: await axios.post(LOCAL_INDIKATOR, data);
		useIndikatorStore.setState({ loading: false });
		return result.data;
	} catch (e: any) {
		console.log(
			"utils.master.indikator.save",
			new Date().toISOString(),
			e.response.data
		);
		useIndikatorStore.setState({ loading: false });
		throw new Error(e.response.data.message);
	}
};

export const doDelete = async (id: number) => {
	useIndikatorStore.setState({ loading: true });
	try {
		const result = await axios.delete(`${LOCAL_INDIKATOR}/${id}`);
		useIndikatorStore.setState({ loading: false });
		return result.data;
	} catch (e: any) {
		console.log(
			"utils.master.indikator.delete",
			new Date().toISOString(),
			e.response.data
		);
		useIndikatorStore.setState({ loading: false });
		throw new Error(e.response.data.message);
	}
};
