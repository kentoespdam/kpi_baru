import { LOCAL_URAIAN_FILE, UraianFileData } from "@myTypes/entity/uraian.file";
import axios from "axios";

export const doUpload = async (formData: FormData) => {
	try {
		const { data } = await axios.post(`${LOCAL_URAIAN_FILE}`, formData, {
			headers: {
				"Accept": "multipart/form-data",
				"Content-Type": "multipart/form-data",
			},
		});
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.trans.file.post",
			new Date().toISOString(),
			e.response.data.message
		);

		throw new Error(e.response.data.message);
	}
};

export const doDelete = async (id: number) => {
	try {
		const { data } = await axios.delete(`${LOCAL_URAIAN_FILE}/${id}`);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.trans.file.delete",
			new Date().toISOString(),
			e.response.data.message
		);

		throw new Error(e.response.data.message);
	}
};
