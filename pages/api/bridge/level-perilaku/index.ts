import {
	getHandler,
	getSearch,
	saveHandler,
} from "@commons/helpers/fetch.helper";
import { REMOTE_BRIDGE_LEVEL_PERILAKU } from "@interfaces/IBridgeLevelPerilaku";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const search = getSearch(req);
	switch (req.method) {
		case "POST":
			return saveHandler(req, res, REMOTE_BRIDGE_LEVEL_PERILAKU);
		case "PUT":
			return saveHandler(req, res, REMOTE_BRIDGE_LEVEL_PERILAKU);
		default:
			return getHandler(
				req,
				res,
				`${REMOTE_BRIDGE_LEVEL_PERILAKU}/page${search}`
			);
	}
}
