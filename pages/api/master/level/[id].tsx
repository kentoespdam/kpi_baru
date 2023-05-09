import type { NextApiRequest, NextApiResponse } from "next";
import { REMOTE_LEVEL } from "@commons/interfaces/ILevel";
import { deleteHandler } from "@commons/helpers/fetch.helper";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "DELETE":
			return deleteHandler(req, res, REMOTE_LEVEL);
		default:
			res.status(405).json({ message: "Method not allowed" });
	}
	res.status(200).json({ name: "John Doe" });
}
