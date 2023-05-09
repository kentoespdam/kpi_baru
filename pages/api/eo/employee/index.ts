import type { NextApiRequest, NextApiResponse } from "next";
import { REMOTE_EMPLOYEE } from "@interfaces/IEmployee";
import { getHandler, getSearch, saveHandler } from "@helpers/fetch.helper";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const nipam = req.query?.nipam;
	const posParent = req.query?.posParent;
	const organizationCode = req.query?.organizationCode;
	const posId = req.query?.posId;

	if (nipam !== undefined)
		return getHandler(req, res, `${REMOTE_EMPLOYEE}/${nipam}/nipam`);
	if (posParent !== undefined)
		return getHandler(req, res, `${REMOTE_EMPLOYEE}/${posParent}/staff`);
	if (organizationCode !== undefined)
		return getHandler(
			req,
			res,
			`${REMOTE_EMPLOYEE}/${organizationCode}/organization`
		);
	if (posId !== undefined)
		return getHandler(req, res, `${REMOTE_EMPLOYEE}/${posId}/position`);

	return getHandler(req, res, `${REMOTE_EMPLOYEE}${getSearch(req)}`);
}
