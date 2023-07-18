import { LOCAL_KPI, KpiData } from "@myTypes/entity/kpi";
import axios from "axios";

export const getPage = async (props: any) => {
	const { queryKey } = props;

	const { pageRequest, sortRequest } = queryKey[1];
	const kpiData = queryKey[2] satisfies KpiData;
	const params = new URLSearchParams();
	params.set("page", pageRequest.page);
	params.set("size", pageRequest.size);

	if (sortRequest.sort) {
		params.set("sort", sortRequest.sort);
		params.set("direction", sortRequest.direction);
	}
	if (kpiData.kpi) params.set("kpi", kpiData.kpi);
	if (kpiData.status) params.set("status", kpiData.status);
	if (kpiData.tukin) params.set("tukin", kpiData.tukin);
	if (kpiData.level) params.set("levelId", kpiData.level.id);

	try {
		const { data } = await axios.get(`${LOCAL_KPI}?${params.toString()}`);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.kpi.page",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const getById = async (props: any) => {
	const id = props[1];
	try {
		const { data } = await axios.get(`${LOCAL_KPI}/${id}`);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.kpi.getById",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const doSave = async (data: KpiData) => {
	try {
		const result = data.id
			? await axios.put(`${LOCAL_KPI}/${data.id}`, data)
			: await axios.post(LOCAL_KPI, data);
		return result.data;
	} catch (e: any) {
		console.log(
			"utils.master.kpi.save",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const doDelete = async (id: number) => {
	try {
		const result = await axios.delete(`${LOCAL_KPI}/${id}`);
		return result.data;
	} catch (e: any) {
		console.log(
			"utils.master.kpi.delete",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};
