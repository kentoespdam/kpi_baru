import { NextRequest } from "next/server";
import { getAccount, getSession } from "src/lib/appwrite";

export const GET = async (req: NextRequest) => {
	try {
		const session = await getSession(req.cookies);
		const account = await getAccount(req.cookies);
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
