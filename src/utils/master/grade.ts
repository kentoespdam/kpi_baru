import { LOCAL_GRADE, GradeData } from "@myTypes/entity/grade";
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
	if (gradeData.grade) params.set("grade", gradeData.grade.id);

	try {
		const { data } = await axios.get(`${LOCAL_GRADE}?${params.toString()}`);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.grade.page",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const getById = async (props: any) => {
	const id = props[1];
	try {
		const { data } = await axios.get(`${LOCAL_GRADE}/${id}`);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.master.grade.getById",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const doSave = async (data: GradeData) => {
	try {
		const result = data.id
			? await axios.put(`${LOCAL_GRADE}/${data.id}`, data)
			: await axios.post(LOCAL_GRADE, data);
		return result.data;
	} catch (e: any) {
		console.log(
			"utils.master.grade.save",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const doDelete = async (id: number) => {
	try {
		const result = await axios.delete(`${LOCAL_GRADE}/${id}`);
		return result.data;
	} catch (e: any) {
		console.log(
			"utils.master.grade.delete",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};
