import { saveHandler } from "@helpers/fetch.helper";
import { REMOTE_TRANS_PERILAKU_NILAI } from "@interfaces/ITransPerilakuNilai";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const method = req.method;

	switch (method) {
		case "PUT":
			return saveHandler(req, res, REMOTE_TRANS_PERILAKU_NILAI);
		default:
			return res.status(405).json({ message: "Method not allowed" });
	}
}
