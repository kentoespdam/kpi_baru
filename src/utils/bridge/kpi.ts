import { BridgeKpiData, LOCAL_BRIDGE_KPI } from "@myTypes/entity/bridge.kpi";
import axios from "axios";

export const getPage = async (props: any) => {
	const { queryKey } = props;

	const { pageRequest, sortRequest } = queryKey[1];
	const params = new URLSearchParams();
	params.set("page", pageRequest.page);
	params.set("size", pageRequest.size);

	if (sortRequest.sort) {
		params.set("sort", sortRequest.sort);
		params.set("direction", sortRequest.direction);
	}

	const { nipam, name, position, organization, level, kpi, status } =
		queryKey[2];
	if (nipam) params.set("nipam", nipam);
	if (name) params.set("name", name);
	if (position) params.set("positionId", position.id);
	if (organization) params.set("organizationId", organization.id);
	if (level) params.set("levelId", level.id);
	if (kpi) params.set("kpiId", kpi.id);
	if (status) params.set("status", status);

	try {
		const { data } = await axios.get(
			`${LOCAL_BRIDGE_KPI}?${params.toString()}`
		);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.bridge.kpi.page",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const getList = async () => {
	try {
		const { data } = await axios.get(`${LOCAL_BRIDGE_KPI}/list`);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.bridge.kpi.list",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const getById = async (props: any) => {
	const id = props[1];
	try {
		const { data } = await axios.get(`${LOCAL_BRIDGE_KPI}/${id}`);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.bridge.kpi.getById",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const doSave = async (data: BridgeKpiData) => {
	try {
		const result = data.id
			? await axios.put(`${LOCAL_BRIDGE_KPI}/${data.id}`, data)
			: await axios.post(LOCAL_BRIDGE_KPI, data);
		return result.data;
	} catch (e: any) {
		console.log(
			"utils.bridge.kpi.save",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const doDelete = async (props: any) => {
	const { queryKey } = props;
	const id = queryKey[1];
	try {
		const { data } = await axios.delete(`${LOCAL_BRIDGE_KPI}/${id}`);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.bridge.kpi.getById",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};
