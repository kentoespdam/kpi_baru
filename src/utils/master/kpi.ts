import { KpiData, KpiFilter, LOCAL_KPI } from "@myTypes/entity/kpi";
import axios from "axios";

export const getPage = async (props: any) => {
	const { queryKey } = props;

	const { pageRequest, sortRequest } = queryKey[1];
	const KpiFilter = queryKey[2] satisfies KpiFilter;
	const params = new URLSearchParams();
	params.set("page", pageRequest.page);
	params.set("size", pageRequest.size);

	if (sortRequest.sort) {
		params.set("sort", sortRequest.sort);
		params.set("direction", sortRequest.direction);
	}
	if (KpiFilter.organization)
		params.set("organizationId", KpiFilter.organization.id);
	if (KpiFilter.position) params.set("positionId", KpiFilter.position.id);
	if (KpiFilter.profesi) params.set("profesiId", KpiFilter.profesi.id);
	if (KpiFilter.grade) params.set("gradeId", KpiFilter.grade.id);
	if (KpiFilter.name) params.set("name", KpiFilter.name);
	if (KpiFilter.status) params.set("status", KpiFilter.status);

	try {
		const { data } = await axios.get(`${LOCAL_KPI}?${params.toString()}`);
		return data.data;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"utils.master.kpi.page",
			new Date().toISOString(),
			err.response?.data
		);
		throw new Error(err.response?.data,);
	}
};

export const getList = async () => {
	try {
		const { data } = await axios.get(`${LOCAL_KPI}/list`);
		return data.data;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"utils.master.kpi.page",
			new Date().toISOString(),
			err.response?.data
		);
		throw new Error(err.response?.data,);
	}
};

export const getById = async (props: any) => {
	const id = props[1];
	try {
		const { data } = await axios.get(`${LOCAL_KPI}/${id}`);
		return data.data;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"utils.master.kpi.getById",
			new Date().toISOString(),
			err.response?.data
		);
		throw new Error(err.response?.data,);
	}
};

export const doSave = async (data: KpiData) => {
	try {
		const result = data.id
			? await axios.put(`${LOCAL_KPI}/${data.id}`, data)
			: await axios.post(LOCAL_KPI, data);
		return result.data;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"utils.master.kpi.save",
			new Date().toISOString(),
			err.response?.data
		);
		throw new Error(err.response?.data,);
	}
};

export const doDelete = async (id: number) => {
	try {
		const result = await axios.delete(`${LOCAL_KPI}/${id}`);
		return result.data;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"utils.master.kpi.delete",
			new Date().toISOString(),
			err.response?.data
		);
		throw new Error(err.response?.data,);
	}
};
