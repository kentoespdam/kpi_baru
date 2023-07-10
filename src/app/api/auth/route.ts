import { appwriteHeader } from "@helper/index";
import axios from "axios";
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, sessionNames } from "src/lib";

export const POST = async (req: Request) => {
	const body = await req.json();
	try {
		console.log(body);
		const { data, status, headers } = await axios.post(
			`${APPWRITE_ENDPOINT}/v1/account/sessions/email`,
			body,
			{
				headers: {
					"Content-Type": "application/json",
					"X-Appwrite-Project": APPWRITE_PROJECT_ID,
				},
			}
		);
		const setCookie = headers["set-cookie"];
		const fallbackCookie = JSON.parse(headers["x-fallback-cookies"]);
		const token = await createToken(fallbackCookie[sessionNames[0]]);
		console.log("token", token);
		return new Response(data.data, { status: status });
	} catch (e: any) {
		console.log(
			"api.auth.post:",
			new Date().toLocaleString(),
			e.response.data
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};

const createToken = async (cookieString: string) => {
	console.log(appwriteHeader(cookieString));
	try {
		const { data, status, headers } = await axios.post(
			`${APPWRITE_ENDPOINT}/v1/account/jwt`,
			{
				headers: appwriteHeader(cookieString),
			}
		);
		return data.data;
	} catch (e: any) {
		console.log(
			"api.auth.createToken:",
			new Date().toLocaleString(),
			e.response.data
		);
	}
};
