import { REMOTE_URAIAN_FILE } from "@interfaces/IUraianFile";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
	const headers = {
		...req.headers,
		Authorization: `Bearer ${token?.accessToken}`,
	};
	delete headers.cookie;

	return axios
		.post(REMOTE_URAIAN_FILE, req, { headers: headers })
		.then((response) => {
			const { data } = response;
			res.status(response.status).json(data);
		})
		.catch((error) => {
			const { response } = error;
			res.status(response.status).json(response.data);
		});
}
