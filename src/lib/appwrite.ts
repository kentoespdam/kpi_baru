import { appwriteHeader } from "@helper/index";
import axios from "axios";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { APPWRITE_ENDPOINT } from ".";

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

export const createToken = async (
	cookieString: RequestCookies | ReadonlyRequestCookies
) => {
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
		throw new Error(e.response.data.message);
	}
};

export const updatePassword = async (
	cookieString: RequestCookies | string,
	password: string,
	oldPassword: string
) => {
	try {
		const { status, data } = await axios.patch(
			`${APPWRITE_ENDPOINT}/v1/account/password`,
			{
				password: password,
				oldPassword: oldPassword,
			},
			{
				headers: appwriteHeader(cookieString),
			}
		);
		return new Response(JSON.stringify(data), { status });
	} catch (e: any) {
		console.log(
			"api.auth.update.password:",
			new Date().toLocaleString(),
			e.response.data
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};

export const updateName = async (
	cookieString: RequestCookies | string,
	name: string
) => {
	try {
		const { status, data } = await axios.patch(
			`${APPWRITE_ENDPOINT}/v1/account/name`,
			{
				name: name,
			},
			{
				headers: appwriteHeader(cookieString),
			}
		);
		return new Response(JSON.stringify(data), { status });
	} catch (e: any) {
		console.log(
			"api.auth.update.name:",
			new Date().toLocaleString(),
			e.response.data
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};

export const updateEmail = async (
	cookieString: RequestCookies | string,
	email: string
) => {
	try {
		const { status, data } = await axios.patch(
			`${APPWRITE_ENDPOINT}/v1/account/email`,
			{
				email: email,
			},
			{
				headers: appwriteHeader(cookieString),
			}
		);
		return new Response(JSON.stringify(data), { status });
	} catch (e: any) {
		console.log(
			"api.auth.update.email:",
			new Date().toLocaleString(),
			e.response.data
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
