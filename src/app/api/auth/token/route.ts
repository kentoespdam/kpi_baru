import { setCookieToken } from "@helper/index";
import { tokenChecker } from "@helper/token";
import { NextRequest } from "next/server";
import { createToken } from "src/lib/appwrite";

export const OPTIONS = async (req: NextRequest) => {
	const reqCookies = req.cookies;
	const check = tokenChecker(reqCookies);

	if (check.status === "ok") return new Response(check.status);
	if (check.status === "reauth")
		return new Response(check.status, { status: 204 });

	const token = await createToken(reqCookies);

	return new Response(JSON.stringify({ message: "OK" }), {
		headers: {
			"Set-Cookie": setCookieToken(token),
		},
	});
};
