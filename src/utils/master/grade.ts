import { GradeData, LOCAL_GRADE } from "@myTypes/entity/grade";
import { useGradeStore } from "@store/filter/master/grade";
import axios from "axios";

export const getPage = async (props: any) => {
	const { queryKey } = props;

	const { pageRequest, sortRequest } = queryKey[1];
	const gradeData = queryKey[2] satisfies GradeData;
	const params = new URLSearchParams();
	params.set("page", pageRequest.page);
	params.set("size", pageRequest.size);

	if (sortRequest.sort) {
		params.set("sort", sortRequest.sort);
		params.set("direction", sortRequest.direction);
	}
	if (gradeData.grade) params.set("grade", gradeData.grade);
	if (gradeData.status) params.set("status", gradeData.status);
	if (gradeData.tukin) params.set("tukin", gradeData.tukin);
	if (gradeData.level) params.set("levelId", gradeData.level.id);

	useGradeStore.setState({ loading: true });

	try {
		const { data } = await axios.get(`${LOCAL_GRADE}?${params.toString()}`);
		useGradeStore.setState({ loading: false });
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.grade.page",
			new Date().toISOString(),
			e.response.data
		);
		useGradeStore.setState({ loading: false });
		throw new Error(e.response.data.message);
	}
};

export const getList = async () => {
	try {
		const { data } = await axios.get(`${LOCAL_GRADE}/list`);
		useGradeStore.setState({ loading: false });
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.grade.list",
			new Date().toISOString(),
			e.response.data
		);
		useGradeStore.setState({ loading: false });
		throw new Error(e.response.data.message);
	}
};

export const getById = async (props: any) => {
	const id = props[1];
	useGradeStore.setState({ loading: true });
	try {
		const { data } = await axios.get(`${LOCAL_GRADE}/${id}`);
		useGradeStore.setState({ loading: false });
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.grade.getById",
			new Date().toISOString(),
			e.response.data
		);
		useGradeStore.setState({ loading: false });
		throw new Error(e.response.data.message);
	}
};

export const doSave = async (data: GradeData) => {
	useGradeStore.setState({ loading: true });
	try {
		const result = data.id
			? await axios.put(`${LOCAL_GRADE}/${data.id}`, data)
			: await axios.post(LOCAL_GRADE, data);
		useGradeStore.setState({ loading: false });
		return result.data;
	} catch (e: any) {
		console.log(
			"utils.master.grade.save",
			new Date().toISOString(),
			e.response.data
		);
		useGradeStore.setState({ loading: false });
		throw new Error(e.response.data.message);
	}
};

export const doDelete = async (id: number) => {
	useGradeStore.setState({ loading: true });
	try {
		const result = await axios.delete(`${LOCAL_GRADE}/${id}`);
		useGradeStore.setState({ loading: false });
		return result.data;
	} catch (e: any) {
		console.log(
			"utils.master.grade.delete",
			new Date().toISOString(),
			e.response.data
		);
		useGradeStore.setState({ loading: false });
		throw new Error(e.response.data.message);
	}
};
