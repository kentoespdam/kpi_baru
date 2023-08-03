import { NextRequest } from "next/server";
import { getAccount, getSession } from "src/lib/appwrite";

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;

	try {
		if (cookie.size === 0)
			return new Response("unauthorized", { status: 401 });
		const session = await getSession(cookie);
		const account = await getAccount(cookie);
		const user = {
			$id: session.$id,
			userId: session.userId,
			name: account.name,
			email: account.email,
			prefs: account.prefs,
		};
		return new Response(JSON.stringify(user));
	} catch (e: any) {
		return new Response(e.message, { status: 401 });
	}
};
