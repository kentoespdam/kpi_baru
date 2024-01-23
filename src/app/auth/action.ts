"use server";

import { userToEmail } from "@helpers/email";
import { AxiosErrorData, cookieStringToObject } from "@helpers/index";
import { getUserByNipam } from "@lib/appwrite/user";
import { DEFAULT_MAIL_DOMAIN, authUrl, projectId } from "@utils/index";
import axios, { AxiosError } from "axios";
import { cookies, headers } from "next/headers";

export const doLogin = async (_prevState: unknown, formData: FormData) => {
	const headerList = headers();
	const callbackUrl = cookies().get("callback_url")?.value;
	const email = userToEmail(`${formData.get("email")}`);
	const password = `${formData.get("password")}`;

	const username = email.split("@")[0];
	const userExist = await getUserByNipam(username);
	if (!userExist)
		return {
			isAuth: false,
			data: null,
			message:
				"Akun anda tidak ditemukan / belum aktif, silahkan hubungi Administrator.",
		};

	try {
		const { headers } = await axios.post(
			authUrl,
			{
				email: username[1]?username:`${username}@${DEFAULT_MAIL_DOMAIN}`,
				password: password,
			},
			{
				headers: {
					"Content-Type": "application/json",
					"X-Appwrite-Project": projectId,
				},
			},
		);

		// set session cookie
		headers["set-cookie"]?.forEach((item, index) => {
			const cookieObject = cookieStringToObject(item, headerList);
			cookies().set(cookieObject.name, cookieObject.value, cookieObject);
		});

		return {
			isAuth: true,
			data: null,
			message: "Login Success...",
			callbackUrl: callbackUrl,
		};
	} catch (e) {
		const error = e as unknown as AxiosError;
		const err = error.response?.data as AxiosErrorData;
		console.log(err);
		return {
			isAuth: false,
			data: null,
			message: err.message,
		};
	}
};
