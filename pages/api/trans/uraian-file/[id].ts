import {
	deleteHandler,
	downloadHandler,
	getHandler,
} from "@helpers/fetch.helper";
import { REMOTE_URAIAN_FILE } from "@interfaces/IUraianFile";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
	api: {
		responseLimit: false,
		bodyParser: false,
	},
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	switch (req.method) {
		case "DELETE": {
			return deleteHandler(req, res, REMOTE_URAIAN_FILE);
		}
		default: {
			const url = `${REMOTE_URAIAN_FILE}/${req.query.id}/file`;
			return downloadHandler(req, res, url);
		}
	}
}
