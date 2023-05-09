import { deleteHandler } from "@helpers/fetch.helper";
import { REMOTE_URAIAN_INDIKATOR } from "@interfaces/IUraianIndikator";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "DELETE":
			return deleteHandler(req, res, REMOTE_URAIAN_INDIKATOR);
		default:
			return res.status(405).end();
	}
}
