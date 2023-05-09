import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { nextOptions } from "./[...nextauth]";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getServerSession(req, res, nextOptions);
	res.json(session);
}
