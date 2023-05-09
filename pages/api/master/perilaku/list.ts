import { getHandler, getSearch } from "@helpers/fetch.helper";
import { REMOTE_PERILAKU } from "@interfaces/IPerilaku";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const search = getSearch(req);
	return getHandler(req, res, `${REMOTE_PERILAKU}${search}`);
}
