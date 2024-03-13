import { LOCAL_URAIAN_FILE } from "@myTypes/entity/uraian.file";
import axios, { AxiosError } from "axios";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getFiles = async (props: any) => {
	const { queryKey } = props;
	const id = queryKey[1];

	try {
		const { data } = await axios.get(`${LOCAL_URAIAN_FILE}/uraian/${id}`);
		return data.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.trans.get.id",
			new Date().toISOString(),
			err.response?.data,
		);

		throw new Error(JSON.stringify(err.response?.data));
	}
};

export const doUpload = async (formData: {
	periode: number;
	nipam: string;
	transKpiUraianId: number;
	file: File;
}) => {
	const { periode, nipam, transKpiUraianId, file } = formData;
	try {
		const { data } = await axios.post(
			`${LOCAL_URAIAN_FILE}`,
			{
				periode: periode,
				nipam: nipam,
				transKpiUraianId: transKpiUraianId,
				file: file,
			},
			{
				headers: {
					Accept: "*/*",
					"Content-Type": "multipart/form-data",
					"X-Periode": periode,
					"X-Nipam": nipam,
					"X-TransKpiUraianId": transKpiUraianId,
				},
				onUploadProgress: (event) => {
					console.log(
						"Current progress:",
						// biome-ignore lint/style/noNonNullAssertion: <explanation>
						Math.round((event.loaded * 100) / event.total!),
					);
				},
			},
		);
		return data.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.trans.file.post",
			new Date().toISOString(),
			err.response?.data,
		);

		throw new Error(JSON.stringify(err.response?.data));
	}
};

export const doDelete = async (id: number) => {
	try {
		const { data } = await axios.delete(`${LOCAL_URAIAN_FILE}/${id}`);
		return data.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.trans.file.delete",
			new Date().toISOString(),
			err.response?.data,
		);

		throw new Error(JSON.stringify(err.response?.data));
	}
};
