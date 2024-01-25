import { cookieStringToObject } from "@helper/index";
import { getCurrentAccount, getUserByNipam } from "@lib/appwrite/user";
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from "@lib/index";
import { SessionUser } from "@store/main/session";
import axios, { AxiosError } from "axios";
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";

export const revalidate = 0;
export const POST = async (req: NextRequest) => {
	const cookieList = req.cookies;
	const headerList = headers();
	const body = await req.json();

	try {
		const userNipam = await getUserByNipam(cookieList, body.email);
		if (!userNipam) {
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
		const { headers, data, status } = await axios.post(
			`${APPWRITE_ENDPOINT}/v1/account/sessions/email`,
			{ email: body.email, password: body.password },
			{
				headers: {
					"Content-Type": "application/json",
					"X-Appwrite-Project": APPWRITE_PROJECT_ID,
				},
			},
		);

		headers["set-cookie"]?.forEach((item, index) => {
			const cookieObject = cookieStringToObject(item, headerList);
			cookies().set(cookieObject.name, cookieObject.value, cookieObject);
		});

		const currAccount = await getCurrentAccount(cookies());

		const user: SessionUser = {
			$id: data.$id,
			userId: data.userId,
			name: currAccount.name,
			email: currAccount.email,
			prefs: currAccount.prefs,
		};

		return new Response(JSON.stringify(user), {
			status: status,
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
