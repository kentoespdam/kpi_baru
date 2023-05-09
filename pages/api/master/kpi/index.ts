import {
	getHandler,
	getSearch,
	saveHandler,
} from "@commons/helpers/fetch.helper";
import { REMOTE_KPI } from "@commons/interfaces/IKpi";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const search = getSearch(req);
	switch (req.method) {
		case "POST":
			return saveHandler(req, res, REMOTE_KPI);
		case "PUT":
			return saveHandler(req, res, REMOTE_KPI);
		default:
			return getHandler(req, res, `${REMOTE_KPI}/page${search}`);
	}
}
