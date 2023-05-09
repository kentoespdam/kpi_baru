import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useAsync<T, E = Error>(
	asyncFunction: () => Promise<T>,
	dependencies: any[] = []
) {
	const [status, setStatus] = useState<
		"idle" | "pending" | "success" | "error"
	>("idle");
	const [value, setValue] = useState<T | null>(null);
	const [error, setError] = useState<E | null>(null);

	const execute = useCallback(() => {
		setStatus("pending");
		setValue(null);
		setError(null);

		return asyncFunction()
			.then((response) => {
				setValue(response);
				setStatus("success");
			})
			.catch((error) => {
				setError(error);
				setStatus("error");
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies);

	useEffect(() => {
		execute();
	}, [execute]);

	return { status, value, error };
}

export const getHelper = async (url: string) => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error: any) {
		return error.response?.data;
	}
};

export const postHelper = async (url: string, req: unknown) => {
	try {
		const response = await axios.post(url, req);
		return response.data;
	} catch (error: any) {
		return error.response?.data;
	}
};

export const putHelper = async (url: string, req: unknown) => {
	try {
		const response = await axios.put(url, req);
		return response.data;
	} catch (error: any) {
		return error.response?.data;
	}
};

export const deleteHelper = async (url: string) => {
	try {
		const response = await axios.delete(url);
		return response.data;
	} catch (error: any) {
		return error.response?.data;
	}
};

export const uploadHelper = async (url: string, req: any) => {
	try {
		const response = await axios.post(url, req, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
			onUploadProgress: (event) => {
				console.log(
					`Current progress:`,
					Math.round((event.loaded * 100) / event.total!)
				);
			},
		});
		return response.data;
	} catch (error: any) {
		return error.response?.data;
	}
};
