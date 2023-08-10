import { LOCAL_URAIAN_FILE } from "@myTypes/entity/uraian.file";
import axios from "axios";

export const getFiles = async (props: any) => {
	const { queryKey } = props;
	const id = queryKey[1];

	try {
		const { data } = await axios.get(`${LOCAL_URAIAN_FILE}/uraian/${id}`);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.trans.get.id",
			new Date().toISOString(),
			e.response.data.message
		);

		throw new Error(e.response.data.message);
	}
};

export const doUpload = async (formData: FormData) => {
	try {
		const { data } = await axios.post(`${LOCAL_URAIAN_FILE}`, formData, {
			headers: {
				"Accept": "*/*",
				"Content-Type": "multipart/form-data",
			},
			onUploadProgress: (event) => {
				console.log(
					`Current progress:`,
					Math.round((event.loaded * 100) / event.total!)
				);
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
