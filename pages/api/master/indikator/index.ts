import { getSearch, saveHandler, getHandler } from "@helpers/fetch.helper";
import { REMOTE_INDIKATOR } from "@interfaces/IIndikator";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const search = getSearch(req);
	switch (req.method) {
		case "POST":
			return saveHandler(req, res, REMOTE_INDIKATOR);
		case "PUT":
			return saveHandler(req, res, REMOTE_INDIKATOR);
		default:
			return getHandler(req, res, `${REMOTE_INDIKATOR}/page${search}`);
	}
}
