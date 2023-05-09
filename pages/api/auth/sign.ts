import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const cookie = req.cookies;
	const callbackUrl = cookie["next-auth.callback-url"];
	const csrfToken = cookie["next-auth.csrf-token"]?.split("|")[0];
	const headers = {
		...req.headers,
		"Content-Type": "application/x-www-form-urlencoded",
	};

	const response = await axios.post(
		"http://localhost:3000/api/auth/signin/keycloak",
		{ callbackUrl: callbackUrl, csrfToken: csrfToken },
		{ headers: headers }
	);

	res.status(200).redirect(response.request.res.responseUrl);
}
