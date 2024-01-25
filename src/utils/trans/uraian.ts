import {
	LOCAL_TRANS_URAIAN,
	TransUraianData,
} from "@myTypes/entity/trans.uraian";
import axios from "axios";

export const getById = async (props: any) => {
	const id = props[1];
	try {
		const { data } = await axios.get(`${LOCAL_TRANS_URAIAN}/${id}`);
		return data.data;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"trans.uraian.id",
			new Date().toISOString(),
			err.response?.data,
		);
		throw new Error(err.response?.data,);
	}
};

export const doSave = async (formData: TransUraianData) => {
	try {
		const { data } = await axios.put(
			`${LOCAL_TRANS_URAIAN}/${formData.id}`,
			formData
		);
		return data.data;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"trans.uraian.save.id",
			new Date().toISOString(),
			err.response?.data,
		);
		throw new Error(err.response?.data,);
	}
};
