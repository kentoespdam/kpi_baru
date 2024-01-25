import {
	appwriteHeader,
	getExpToken,
	isValidIpAddress,
	newHostname,
} from "@helper/index";
import axios, { AxiosError } from "axios";
import {
	RequestCookie,
	RequestCookies,
} from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { APPWRITE_ENDPOINT, sessionNames } from ".";

export const getSession = async (sessCookie: RequestCookies) => {
	try {
		const { data, status } = await axios.get(
			`${APPWRITE_ENDPOINT}/v1/account/sessions/current`,
			{
				headers: appwriteHeader(sessCookie),
			},
		);
		return { status: status, ...data };
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log("lib.appwrite.getSession", err.response?.data);
		return {
			status: err.response?.status,
			data: null,
			message: err.response?.data,
		};
	}
};

export const createToken = async (
	cookies: RequestCookies | ReadonlyRequestCookies,
	host: string,
) => {
	const reqHeaders = appwriteHeader(cookies);

	try {
		const req = await fetch(`${APPWRITE_ENDPOINT}/v1/account/jwt`, {
			method: "POST",
			headers: reqHeaders,
		});
		const data = await req.json();
		const expires = getExpToken(data.jwt);
		const result = {
			name: sessionNames[2],
			value: data.jwt,
			path: "/",
			expires: new Date(expires),
		};
		if (!isValidIpAddress(host)) {
			Object.assign(result, {
				domain: newHostname(host),
				httpOnly: true,
				secure: true,
				sameSite: true,
				priority: "hight",
			});
		}

		return result as RequestCookie;
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log("middleware create token", e);
		return {} as RequestCookie;
	}
};

export const createTokenLogin = async (
	cookies: RequestCookies,
	host: string,
) => {
	const reqHeaders = appwriteHeader(cookies);
	try {
		const req = await fetch(`${APPWRITE_ENDPOINT}/v1/account/jwt`, {
			method: "POST",
			headers: reqHeaders,
		});

		const data = await req.json();
		const expires = getExpToken(data.jwt);
		const result = {
			name: sessionNames[2],
			value: data.jwt,
			path: "/",
			expires: new Date(expires),
		};
		if (!isValidIpAddress(host)) {
			Object.assign(result, {
				domain: newHostname(host),
				httpOnly: true,
				secure: true,
				sameSite: true,
				priority: "hight",
			});
		}

		return result as RequestCookie;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.auth.createToken:",
			new Date().toLocaleString(),
			err.response?.data,
		);
		return null;
	}
};

export const getAccount = async (cookieString: RequestCookies | string) => {
	try {
		const { data } = await axios.get(`${APPWRITE_ENDPOINT}/v1/account`, {
			headers: appwriteHeader(cookieString),
		});
		return data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.auth.getAccount:",
			new Date().toLocaleString(),
			err.response?.data,
		);
		throw new Error(JSON.stringify(err.response?.data));
	}
};

export const updatePassword = async (
	cookieString: RequestCookies | string,
	password: string,
	oldPassword: string,
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
			},
		);
		return new Response(JSON.stringify(data), { status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.auth.update.password:",
			new Date().toLocaleString(),
			err.response?.data,
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};

export const updateName = async (
	cookieString: RequestCookies | string,
	name: string,
) => {
	try {
		const { status, data } = await axios.patch(
			`${APPWRITE_ENDPOINT}/v1/account/name`,
			{
				name: name,
			},
			{
				headers: appwriteHeader(cookieString),
			},
		);
		return new Response(JSON.stringify(data), { status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.auth.update.name:",
			new Date().toLocaleString(),
			err.response?.data,
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};

export const updateEmail = async (
	cookieString: RequestCookies | string,
	email: string,
) => {
	try {
		const { status, data } = await axios.patch(
			`${APPWRITE_ENDPOINT}/v1/account/email`,
			{
				email: email,
			},
			{
				headers: appwriteHeader(cookieString),
			},
		);
		return new Response(JSON.stringify(data), { status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.auth.update.email:",
			new Date().toLocaleString(),
			err.response?.data,
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};
