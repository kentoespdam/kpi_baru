import { newSetCookies } from "@helpers/index";
import { account } from "@lib/appwrite";
import { getUserByNipam } from "@lib/appwrite/user";
import axios, { AxiosError } from "axios";
import { SessionUser } from "@store/main/session";
import { baseAuthUrl, projectId } from "@utils/index";

export const POST = async (req: Request) => {
	const body = await req.json();
	const hostname = req.headers.get("host")?.split(":")[0];

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
				},
			);
		}

		const { data, status, headers } = await axios.post(
			`${baseAuthUrl}/v1/account/sessions/email`,
			body,
			{
				headers: {
					"Content-Type": "application/json",
					"X-Appwrite-Project": projectId,
				},
			},
		);

		const setCookie = headers["set-cookie"] ?? [];
		const fallbackCookie = JSON.parse(headers["x-fallback-cookies"]);
		const [token, acc] = await Promise.all([
			await account().createJWT(),
			await account().get(),
		]);
		const newCookies = newSetCookies(setCookie.join(","), hostname);
		const user: SessionUser = {
			$id: data.$id,
			userId: data.userId,
			name: acc.name,
			email: acc.email,
			prefs: acc.prefs,
		};

		return new Response(JSON.stringify(user), {
			status: status,
			headers: {
				"Set-Cookie": `${newCookies}, ${token}`,
			},
		});
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.auth.post:",
			new Date().toLocaleString(),
			err.response?.data,
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};
