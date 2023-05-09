import type { NextApiRequest, NextApiResponse } from "next";
import { REMOTE_LEVEL } from "@commons/interfaces/ILevel";
import {
	getHandler,
	getSearch,
	saveHandler,
} from "@commons/helpers/fetch.helper";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const search = getSearch(req);
	switch (req.method) {
		case "GET":
			return getHandler(req, res, `${REMOTE_LEVEL}/page${search}`);
		case "POST":
			return saveHandler(req, res, REMOTE_LEVEL);
		case "PUT":
			return saveHandler(req, res, REMOTE_LEVEL);
		default:
			return getHandler(req, res, `${REMOTE_LEVEL}/page${search}`);
	}
}
