import { getHandler } from "@helpers/fetch.helper";
import { REMOTE_EMPLOYEE } from "@interfaces/IEmployee";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const posId = req.query?.id;
	const url = `${REMOTE_EMPLOYEE}/${posId}/staff`;
	return getHandler(req, res, url);
}
