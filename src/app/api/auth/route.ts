import { newSetCookies } from "@helper/index";
import { SessionUser } from "@store/main/session";
import axios from "axios";
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, sessionNames } from "src/lib";
import { createToken, getAccount } from "src/lib/appwrite";
import { getUserByNipam } from "src/lib/appwrite/user";

export const revalidate = 0;
export const POST = async (req: Request) => {
	const body = await req.json();
	try {
		const userNipam = await getUserByNipam(body.email.split("@")[0]);
		if (!userNipam.emailVerification) {
			return new Response(
				JSON.stringify({
					message:
						"Akun anda tidak ditemukan / belum aktif, silahkan hubungi Administrator.",
				}),
				{
					status: 400,
				}
			);
		}
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
		const newCookies = newSetCookies(setCookie!.join(","));
		const account = await getAccount(fallbackCookie[sessionNames[0]]);
		const user: SessionUser = {
			$id: data.$id,
			userId: data.userId,
			name: account.name,
			email: account.email,
			prefs: account.prefs,
		};
		return new Response(JSON.stringify(user), {
			status: status,
			headers: {
				"Set-Cookie": `${newCookies}, ${token}`,
			},
		});
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
