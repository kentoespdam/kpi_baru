import { getHandler, getSearch } from "@commons/helpers/fetch.helper";
import { REMOTE_LEVEL } from "@commons/interfaces/ILevel";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const search = getSearch(req);
	getHandler(req, res, `${REMOTE_LEVEL}${search}`);
}
