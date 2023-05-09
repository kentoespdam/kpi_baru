import {
	getHandler,
	getSearch,
	saveHandler,
} from "@commons/helpers/fetch.helper";
import { REMOTE_BRIDGE_KPI_PEGAWAI } from "@interfaces/IBridgeKpiPegawai";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const search = getSearch(req);
	switch (req.method) {
		case "POST":
			return saveHandler(req, res, REMOTE_BRIDGE_KPI_PEGAWAI);
		case "PUT":
			return saveHandler(req, res, REMOTE_BRIDGE_KPI_PEGAWAI);
		default:
			return getHandler(
				req,
				res,
				`${REMOTE_BRIDGE_KPI_PEGAWAI}/page${search}`
			);
	}
}
