import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let path = `${process.env.KEYCLOAK_LOGOUT_URL}?post_logout_redirect_uri=${process.env.NEXTAUTH_URL}`;

	path += `&client_id=${process.env.KEYCLOAK_CLIENT_ID}`;

	res.redirect(path);
}
