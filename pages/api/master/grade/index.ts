import {
	getHandler,
	getSearch,
	saveHandler,
} from "@commons/helpers/fetch.helper";
import { REMOTE_GRADE } from "@commons/interfaces/IGrade";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const search = getSearch(req);
	switch (req.method) {
		case "POST":
			return saveHandler(req, res, REMOTE_GRADE);
		case "PUT":
			return saveHandler(req, res, REMOTE_GRADE);
		default:
			return getHandler(req, res, `${REMOTE_GRADE}/page${search}`);
	}
}
