import { KpiData, KpiFilter, LOCAL_KPI } from "@myTypes/entity/kpi";
import { useKpiStore } from "@store/filter/master/kpi";
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

	useKpiStore.setState({ loading: true });

	try {
		const { data } = await axios.get(`${LOCAL_KPI}?${params.toString()}`);
		useKpiStore.setState({ loading: false });
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.kpi.page",
			new Date().toISOString(),
			e.response.data
		);
		useKpiStore.setState({ loading: false });
		throw new Error(e.response.data.message);
	}
};

export const getById = async (props: any) => {
	const id = props[1];
	useKpiStore.setState({ loading: true });
	try {
		const { data } = await axios.get(`${LOCAL_KPI}/${id}`);
		useKpiStore.setState({ loading: false });
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.kpi.getById",
			new Date().toISOString(),
			e.response.data
		);
		useKpiStore.setState({ loading: false });
		throw new Error(e.response.data.message);
	}
};

export const doSave = async (data: KpiData) => {
	useKpiStore.setState({ loading: true });
	try {
		const result = data.id
			? await axios.put(`${LOCAL_KPI}/${data.id}`, data)
			: await axios.post(LOCAL_KPI, data);
		useKpiStore.setState({ loading: false });
		return result.data;
	} catch (e: any) {
		console.log(
			"utils.master.kpi.save",
			new Date().toISOString(),
			e.response.data
		);
		useKpiStore.setState({ loading: false });
		throw new Error(e.response.data.message);
	}
};

export const doDelete = async (id: number) => {
	useKpiStore.setState({ loading: true });
	try {
		const result = await axios.delete(`${LOCAL_KPI}/${id}`);
		useKpiStore.setState({ loading: false });
		return result.data;
	} catch (e: any) {
		console.log(
			"utils.master.kpi.delete",
			new Date().toISOString(),
			e.response.data
		);
		useKpiStore.setState({ loading: false });
		throw new Error(e.response.data.message);
	}
};
