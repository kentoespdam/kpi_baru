import { getHandler } from "@commons/helpers/fetch.helper";
import { REMOTE_ORGANIZATION } from "@commons/interfaces/IOrganization";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return getHandler(req, res, `${REMOTE_ORGANIZATION}/list`);
}
