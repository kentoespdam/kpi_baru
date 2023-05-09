import { getHandler, getSearch, saveHandler } from "@helpers/fetch.helper";
import { REMOTE_PERILAKU } from "@interfaces/IPerilaku";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const search = getSearch(req);
	switch (req.method) {
		case "POST":
			return saveHandler(req, res, REMOTE_PERILAKU);
		case "PUT":
			return saveHandler(req, res, REMOTE_PERILAKU);
		default:
			return getHandler(req, res, `${REMOTE_PERILAKU}/page${search}`);
	}
}
