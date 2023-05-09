import { getHandler } from "@helpers/fetch.helper";
import { REMOTE_TRANS_KPI_PEGAWAI } from "@interfaces/ITransKpiPegawai";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { periode, nipam, kpiId } = req.query;
	return getHandler(
		req,
		res,
		`${REMOTE_TRANS_KPI_PEGAWAI}/${periode}/periode/${nipam}/nipam/${kpiId}/kpi`
	);
}
