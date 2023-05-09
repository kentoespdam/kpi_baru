import {
	getSearch,
	saveHandler,
	getHandler,
} from "@commons/helpers/fetch.helper";
import { REMOTE_PROFESI } from "@commons/interfaces/IProfesi";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const search = getSearch(req);
	switch (req.method) {
		case "POST":
			return saveHandler(req, res, REMOTE_PROFESI);
		case "PUT":
			return saveHandler(req, res, REMOTE_PROFESI);
		default:
			return getHandler(req, res, `${REMOTE_PROFESI}/page${search}`);
	}
}
