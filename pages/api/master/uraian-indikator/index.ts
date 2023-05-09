import { getHandler, getSearch, saveHandler } from "@helpers/fetch.helper";
import { REMOTE_URAIAN_INDIKATOR } from "@interfaces/IUraianIndikator";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const search = getSearch(req);
	switch (req.method) {
		case "POST":
			return saveHandler(req, res, REMOTE_URAIAN_INDIKATOR);
		case "PUT":
			return saveHandler(req, res, REMOTE_URAIAN_INDIKATOR);
		default:
			return getHandler(
				req,
				res,
				`${REMOTE_URAIAN_INDIKATOR}/page${search}`
			);
	}
}
