import { getHandler } from "@helpers/fetch.helper";
import { REMOTE_POSITION } from "@interfaces/IPosition";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return getHandler(req, res, `${REMOTE_POSITION}/list`);
}
