import { LOCAL_LEVEL, LevelData } from "@myTypes/entity/level";
import { useLevelStore } from "@store/filter/master/level";
import axios from "axios";

export const getPage = async (props: any) => {
	const { queryKey } = props;

	const { pageRequest, sortRequest, level, status } = queryKey[1];
	const params = new URLSearchParams();
	params.set("page", pageRequest.page);
	params.set("size", pageRequest.size);

	if (sortRequest.sort) {
		params.set("sort", sortRequest.sort);
		params.set("direction", sortRequest.direction);
	}
	if (level) params.set("level", level);
	if (status) params.set("status", status);

	useLevelStore.setState({ loading: true });

	try {
		const { data } = await axios.get(`${LOCAL_LEVEL}?${params.toString()}`);
		useLevelStore.setState({ loading: false });
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.level.page",
			new Date().toISOString(),
			e.response.data
		);
		useLevelStore.setState({ loading: false });
		throw new Error(e.response.data.message);
	}
};

export const getLevelList = async () => {
	useLevelStore.setState({ loading: true });
	try {
		const { data } = await axios.get(`${LOCAL_LEVEL}/list?status=Enabled`);
		useLevelStore.setState({ loading: false });
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.level.list",
			new Date().toISOString(),
			e.response.data
		);
		useLevelStore.setState({ loading: false });
		throw new Error(e.response.data.message);
	}
};

export const getById = async (props: any) => {
	const id = props[1];
	useLevelStore.setState({ loading: true });
	try {
		const { data } = await axios.get(`${LOCAL_LEVEL}/${id}`);
		useLevelStore.setState({ loading: false });
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.level.getById",
			new Date().toISOString(),
			e.response.data
		);
		useLevelStore.setState({ loading: false });
		throw new Error(e.response.data.message);
	}
};

export const doSave = async (data: LevelData) => {
	useLevelStore.setState({ loading: true });
	try {
		const result = data.id
			? await axios.put(`${LOCAL_LEVEL}/${data.id}`, data)
			: await axios.post(LOCAL_LEVEL, data);
		useLevelStore.setState({ loading: false });
		return result.data;
	} catch (e: any) {
		console.log(
			"utils.master.level.save",
			new Date().toISOString(),
			e.response.data
		);
		useLevelStore.setState({ loading: false });
		throw new Error(e.response.data.message);
	}
};

export const doDelete = async (id: number) => {
	useLevelStore.setState({ loading: true });
	try {
		const result = await axios.delete(`${LOCAL_LEVEL}/${id}`);
		useLevelStore.setState({ loading: false });
		return result.data;
	} catch (e: any) {
		console.log(
			"utils.master.level.delete",
			new Date().toISOString(),
			e.response.data
		);
		useLevelStore.setState({ loading: false });
		throw new Error(e.response.data.message);
	}
};
