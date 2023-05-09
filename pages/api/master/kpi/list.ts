import { getHandler, getSearch } from "@helpers/fetch.helper";
import { REMOTE_KPI } from "@interfaces/IKpi";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const search = getSearch(req);
	return getHandler(req, res, `${REMOTE_KPI}${search}`);
}
