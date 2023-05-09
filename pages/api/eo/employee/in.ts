import type { NextApiRequest, NextApiResponse } from "next";
import { REMOTE_EMPLOYEE } from "@interfaces/IEmployee";
import { getHandler } from "@helpers/fetch.helper";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const nipams = req.query.nipam;
	const uri = `${REMOTE_EMPLOYEE}/${nipams}/in`;
	return getHandler(req, res, uri);
}
