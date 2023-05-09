import { getHandler } from "@helpers/fetch.helper";
import { REMOTE_URAIAN_FILE } from "@interfaces/IUraianFile";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const url = `${REMOTE_URAIAN_FILE}/${req.query.id}/uraian`;
	return getHandler(req, res, url);
}
