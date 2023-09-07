import { setCookieToken } from "@helper/index";
import { NextRequest } from "next/server";
import { createToken, getAccount, getSession } from "src/lib/appwrite";

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;

	try {
		if (cookie.size === 0)
			return new Response("unauthorized", { status: 401 });
		const [session, token, account] = await Promise.all([
			await getSession(cookie),
			await createToken(cookie),
			await getAccount(cookie),
		]);

		const user = {
			$id: session.$id,
			userId: session.userId,
			name: account.name,
			email: account.email,
			prefs: account.prefs,
		};
		return new Response(JSON.stringify(user), {
			headers: {
				"Set-Cookie": setCookieToken(token),
			},
		});
	} catch (e: any) {
		return new Response(e.message, { status: 401 });
	}
};
