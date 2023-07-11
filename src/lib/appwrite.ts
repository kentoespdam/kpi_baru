import { appwriteHeader, getExpToken } from "@helper/index";
import axios from "axios";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { APPWRITE_ENDPOINT, APP_HOSTNAME, sessionNames } from ".";

export const getAppwriteSession = async (sessCookie: RequestCookies) => {
	try {
		const { data } = await axios.get(
			`${APPWRITE_ENDPOINT}/v1/account/sessions/current`,
			{
				headers: appwriteHeader(sessCookie),
			}
		);
		console.log(data);
		return data;
	} catch (e: any) {
		console.log("lib.appwrite.getAppwriteSession", e);
	}
};

export const createToken = async (cookieString: RequestCookies | string) => {
	try {
		const { data } = await axios.post(
			`${APPWRITE_ENDPOINT}/v1/account/jwt`,
			{},
			{
				headers: appwriteHeader(cookieString),
			}
		);
		const resCookie = `${sessionNames[2]}=${
			data.jwt
		}; domain=${APP_HOSTNAME}; expires=${new Date(
			getExpToken(data.jwt)
		)}; path=/; httponly; SameSite=none; Secure`;
		return resCookie;
	} catch (e: any) {
		console.log("api.auth.createToken:", new Date().toLocaleString(), e);
		return "";
	}
};
