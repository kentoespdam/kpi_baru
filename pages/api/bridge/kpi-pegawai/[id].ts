import { deleteHandler } from "@helpers/fetch.helper";
import { REMOTE_BRIDGE_KPI_PEGAWAI } from "@interfaces/IBridgeKpiPegawai";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "DELETE":
			return deleteHandler(req, res, REMOTE_BRIDGE_KPI_PEGAWAI);
		default:
			return res.status(405).end();
	}
}
