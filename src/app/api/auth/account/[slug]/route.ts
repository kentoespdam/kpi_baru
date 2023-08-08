import { NextRequest } from "next/server";
import { updateEmail, updateName, updatePassword } from "src/lib/appwrite";
import { createUserAccount } from "src/lib/appwrite/user";

export const PATCH = async (
	req: NextRequest,
	{ params }: { params: { slug: string } }
) => {
	const { slug } = params;
	const body = await req.json();
	const cookies = req.cookies;

	switch (slug) {
		case "create":
			return createUserAccount(body);
		case "password":
			return updatePassword(cookies, body?.newPass, body?.oldPass);
		case "name":
			return updateName(cookies, body?.name);
		case "email":
			return updateEmail(cookies, body?.email);
		default:
			return new Response("Not found", { status: 404 });
	}
};
