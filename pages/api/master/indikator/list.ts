import { getSearch, getHandler } from "@helpers/fetch.helper";
import { REMOTE_INDIKATOR } from "@interfaces/IIndikator";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const search = getSearch(req);
	return getHandler(req, res, `${REMOTE_INDIKATOR}${search}`);
}
