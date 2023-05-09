import { SelectType } from "@commons/interfaces/ICommons";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { Stream } from "stream";
import { promisify } from "util";

export const dataToBody = (data: Record<string, unknown> | undefined | any) => {
	if (data === undefined) return;
	const newData = Object.entries(data).filter((v) => {
		if (!v[1]) return null;
		if (typeof v[1] === "number" && v[1] >= 0) return v[1];
		return v[1];
	});

	return Object.fromEntries(new Map(newData));
};

export const objectToQueryString = (obj: Object) => {
	const str: string[] = [];
	Object.entries(obj).forEach(([key, value]) => {
		if (value !== undefined || value !== null) {
			str.push(
				encodeURIComponent(key) +
					"=" +
					encodeURIComponent(String(value))
			);
		}
	});
	return "?" + str.join("&");
};

export const getSearch = (req: NextApiRequest) => {
	const url = req.url?.split("?")[1];
	return url ? `?${url}` : "";
};

export const pipeline = promisify(Stream.pipeline);

export const filterToRequest = (filter: SelectType[]) => {
	const result = filter.map((item) => {
		if (
			item.value === "" ||
			item.value === null ||
			item.value === undefined
		)
			return [null, null];
		return [item.id, item.value];
	});

	const arrResult = Array.from(result).filter((n) => n[0]);
	const objResult =
		arrResult.length > 0 ? Object.fromEntries(arrResult) : null;
	return objResult;
};

// Path: pages/api/**
export async function getHandler(
	req: NextApiRequest,
	res: NextApiResponse,
	url: string
) {
	const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
	try {
		const response = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${token?.accessToken}`,
			},
		});
		if (response.status === 204) return res.status(204).end();
		res.status(response.status).json(response.data);
	} catch (e: any) {
		console.log(e);
		res.status(e.response.status).json(e.response.data);
	}
}

export async function saveHandler(
	req: NextApiRequest,
	res: NextApiResponse,
	url: string
) {
	const method = req.method;
	const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
	try {
		let request;
		if (method === "POST") {
			request = await axios.post(url, req.body, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token?.accessToken}`,
				},
			});
		} else {
			request = await axios.put(`${url}/${req.body.id}`, req.body, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token?.accessToken}`,
				},
			});
		}

		res.status(request.status).send(request.data);
	} catch (e: any) {
		res.status(e.response.status).send(e.response.data);
	}
}

export async function deleteHandler(
	req: NextApiRequest,
	res: NextApiResponse,
	url: string
) {
	const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
	const id = req.query.id;

	try {
		const request = await axios.delete(`${url}/${id}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token?.accessToken}`,
			},
		});
		res.status(request.status).json(request.data);
	} catch (error: any) {
		res.status(error.response.status).json(error.response.data);
	}
}

export async function uploadHandler(
	req: NextApiRequest,
	res: NextApiResponse,
	url: string
) {
	const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
	const formData = new FormData();
	formData.append("file", req.body.files);
	formData.append("periode", req.body.periode);
	formData.append("nipam", req.body.nipam);
	formData.append("transKpiUraianId", req.body.toString());

	try {
		const request = await axios.post(url, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token?.accessToken}`,
			},
		});
		res.status(request.status).json(request.data);
	} catch (error: any) {
		res.status(error.response.status).json(error.response.data);
	}
}

export async function downloadHandler(
	req: NextApiRequest,
	res: NextApiResponse,
	url: string
) {
	const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
	try {
		const request = await fetch(url, {
			headers: {
				Authorization: `Bearer ${token?.accessToken}`,
			},
		});
		res.status(request.status);
		const requestHeader = request.headers;
		//looping key value from object
		requestHeader.forEach((value, key) => {
			res.setHeader(key, value);
		});
		// res.setHeader("Content-Type", request.headers.get("Content-Type")!);
		// res.setHeader(
		// 	"Content-disposition",
		// 	request.headers.get("Content-disposition")!
		// );
		// res.setHeader(
		// 	"Access-Control-Expose-Headers",
		// 	request.headers.get("Access-Control-Expose-Headers")!
		// );
		// res.setHeader("Accept-Ranges", request.headers.get("Accept-Ranges")!);
		// res.setHeader("Content-Length", request.headers.get("Content-Length")!);
		await pipeline<any, NextApiResponse>(request.body, res);
	} catch (e) {
		const err = e as Error;
		res.status(500).json({ message: err.message });
	}
}
