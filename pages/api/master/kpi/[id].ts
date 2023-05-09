import { deleteHandler } from "@helpers/fetch.helper";
import { REMOTE_KPI } from "@interfaces/IKpi";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "DELETE":
			return deleteHandler(req, res, REMOTE_KPI);
		default:
			return res.status(405).end();
	}
}
