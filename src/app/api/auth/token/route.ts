import { tokenChecker } from "@helper/token";
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";
import { createToken } from "src/lib/appwrite";

export const revalidate = 0;
export const OPTIONS = async (req: NextRequest) => {
	const reqCookies = req.cookies;
	const check = tokenChecker(reqCookies);
	const headerList = headers();
	const hostname = String(headerList.get("host")).split(":")[0];

	if (check.status === "ok") return new Response(check.status);
	if (check.status === "reauth")
		return new Response(check.status, { status: 401 });

	const token = await createToken(reqCookies, hostname);
	cookies().set(token.name, token.value, token);

	return new Response(JSON.stringify({ message: "OK" }), { status: 200 });
};
