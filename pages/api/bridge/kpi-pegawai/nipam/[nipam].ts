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
	return getHandler(req, res, `${REMOTE_BRIDGE_KPI_PEGAWAI}/${req.query.nipam}/nipam`);
}
