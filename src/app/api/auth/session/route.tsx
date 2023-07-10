import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
	return new Response(req.cookies.getAll().join(","));
};
