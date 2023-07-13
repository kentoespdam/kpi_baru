import { appwriteHeader, getExpToken } from "@helper/index";
import axios from "axios";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { APPWRITE_ENDPOINT, APP_HOSTNAME, sessionNames } from ".";

export const getSession = async (sessCookie: RequestCookies) => {
	try {
		const { data, status } = await axios.get(
			`${APPWRITE_ENDPOINT}/v1/account/sessions/current`,
			{
				headers: appwriteHeader(sessCookie),
			}
		);
		return { status: status, ...data };
	} catch (e: any) {
		console.log("lib.appwrite.getSession", e.response.data);
		return {
			status: e.response.status,
			data: null,
			message: e.response.message,
		};
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
		return data.jwt;
	} catch (e: any) {
		console.log(
			"api.auth.createToken:",
			new Date().toLocaleString(),
			e.response.data
		);
		return "";
	}
};

export const getAccount = async (cookieString: RequestCookies | string) => {
	try {
		const { data } = await axios.get(`${APPWRITE_ENDPOINT}/v1/account`, {
			headers: appwriteHeader(cookieString),
		});
		return data;
	} catch (e: any) {
		console.log(
			"api.auth.getAccount:",
			new Date().toLocaleString(),
			e.response.data
		);
		throw Error(e.response.data.message);
	}
};
