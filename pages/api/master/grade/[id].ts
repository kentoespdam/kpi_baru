import { deleteHandler } from "@commons/helpers/fetch.helper";
import { REMOTE_GRADE } from "@commons/interfaces/IGrade";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "DELETE":
			return deleteHandler(req, res, REMOTE_GRADE);
		default:
			return res.status(405).end();
	}
}
