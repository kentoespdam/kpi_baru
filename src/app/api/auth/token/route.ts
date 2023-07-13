import { setCookieToken } from "@helper/index";
import { NextRequest } from "next/server";
import { sessionNames } from "src/lib";
import { createToken } from "src/lib/appwrite";

export const GET = async (req: NextRequest) => {
	const reqCookies = req.cookies;
	if (reqCookies.get(sessionNames[2]))
		return new Response(JSON.stringify({ message: "OK" }));

	const token = await createToken(reqCookies);

	return new Response(JSON.stringify({ message: "OK" }), {
		headers: {
			"Set-Cookie": setCookieToken(token),
		},
	});
};
