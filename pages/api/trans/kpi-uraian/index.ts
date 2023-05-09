import { saveHandler } from "@helpers/fetch.helper";
import { REMOTE_TRANS_KPI_URAIAN } from "@interfaces/ITransKpiPegawai";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "PUT":
			return saveHandler(req, res, REMOTE_TRANS_KPI_URAIAN);
		default:
			return res.status(204).end();
	}
}
