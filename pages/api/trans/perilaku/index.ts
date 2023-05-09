import { getHandler } from "@helpers/fetch.helper";
import { REMOTE_TRANS_PERILAKU } from "@interfaces/ITransPerilaku";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { periode, nipam, level } = req.query;
	const url = `${REMOTE_TRANS_PERILAKU}/${periode}/periode/${nipam}/nipam/${level}/level`;

	return getHandler(req, res, url);
}
