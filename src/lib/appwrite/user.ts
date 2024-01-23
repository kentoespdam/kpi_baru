import {
	AxiosErrorData,
	appwriteHeader,
	getExpToken,
	newHostname,
} from "@helpers/index";
import {
	appwriteKey,
	baseAuthUrl,
	projectId,
	sessionNames,
} from "@utils/index";
import axios, { AxiosError } from "axios";
import {
	RequestCookie,
	RequestCookies,
} from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const getUserByNipam = async (nipam: string) => {
	try {
		const { data } = await axios.get(
			`${baseAuthUrl}/users/${nipam.split("@")[0]}`,
			{
				headers: {
					"Content-Type": "application/json",
					"X-Appwrite-Response-Format": "1.0.0",
					"X-Appwrite-Project": projectId,
					"X-Appwrite-Key": appwriteKey,
				},
			},
		);
		return data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"lib.appwrite.user.getUserByNipam",
			new Date().toISOString(),
			err.response?.data,
		);
		return null;
	}
};

export const createJwtToken = async (
	xFallback: string,
	headerList: ReadonlyHeaders,
) => {
	const host = headerList.get("host")
		? headerList.get("host")?.split(":")[0]
		: "";
	try {
		const { headers, data } = await axios.post(
			`${baseAuthUrl}/account/jwt`,
			{},
			{
				headers: {
					"Content-Type": "application/json",
					"X-Appwrite-Response-Format": "1.0.0",
					"X-Appwrite-Project": projectId,
					"X-Appwrite-Key": appwriteKey,
					"X-Fallback-Cookies": xFallback,
				},
			},
		);
		const expires = getExpToken(data.jwt);
		const result = {
			name: sessionNames[2],
			value: data.jwt,
			domain: newHostname(host),
			path: "/",
			maxAge: new Date(expires),
			httpOnly: true,
			secure: true,
			sameSite: true,
			priority: "hight",
		} as RequestCookie;
		return result;
	} catch (e) {
		const error = e as unknown as AxiosError;
		const err = error.response?.data as AxiosErrorData;
		console.error("lib.appwrite.user.createJwtToken", err);
		return {} as RequestCookie;
	}
};

export const getCurrentAccount = async (
	cookies: RequestCookies | ReadonlyRequestCookies,
) => {
	const token = cookies.get(sessionNames[2])?.value;
	const headers = appwriteHeader(cookies, token);
	try {
		const { data } = await axios.get(`${baseAuthUrl}/account`, {
			headers: headers,
		});
		return data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"lib.appwrite.user.getCurrentAccount",
			new Date().toISOString(),
			err.response?.data,
		);
		return null;
	}
};

export const getCUrrentSession = async (
	cookies: RequestCookies | ReadonlyRequestCookies,
) => {
	const token = cookies.get(sessionNames[2])?.value;
	const headers = appwriteHeader(cookies, token);
	try {
		const { data } = await axios.get(`${baseAuthUrl}/account/session/current`, {
			headers: headers,
		});
		return data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"lib.appwrite.user.getCUrrentSession",
			new Date().toISOString(),
			err.response?.data,
		);
		return null;
	}
};
