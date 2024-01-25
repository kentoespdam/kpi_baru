import axios, { AxiosError } from "axios";
import { APPWRITE_ENDPOINT, defaultRoles, sessionNames } from "@lib/index";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { appwriteHeader } from "@helper/index";

export const createUserAccount = async (
	cookies: RequestCookies | ReadonlyRequestCookies,
	account: {
		userId: string;
		email: string;
		password: string;
		name: string;
	},
) => {
	try {
		const token = cookies.get(sessionNames[2])?.value;
		const headers = appwriteHeader(cookies, token);

		const user = await getUserByNipam(cookies, account.userId);
		if (user !== null) return user;

		const { data } = await axios.post(
			`${APPWRITE_ENDPOINT}/v1/users`,
			account,
			{ headers: headers },
		);

		data.prefs = await updateRoleUser(cookies, data.$id, defaultRoles);
		return data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"lib.appwrite.user.createUserAccount",
			new Date().toISOString(),
			err.response?.data,
		);
		return null;
	}
};

export const getAllUser = async (
	cookies: RequestCookies | ReadonlyRequestCookies,
) => {
	try {
		const token = cookies.get(sessionNames[2])?.value;
		const headers = appwriteHeader(cookies, token);

		const { data } = await axios.get(`${APPWRITE_ENDPOINT}/v1/users`, {
			headers: headers,
		});
		return data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"lib.appwrite.getAllUser",
			new Date().toISOString(),
			err.response?.data,
		);
		return null;
	}
};

export const getUserByNipam = async (
	cookies: RequestCookies | ReadonlyRequestCookies,
	nipam: string,
) => {
	try {
		const token = cookies.get(sessionNames[2])?.value;
		const headers = appwriteHeader(cookies, token);

		const { data } = await axios.get(
			`${APPWRITE_ENDPOINT}/v1/users/${nipam.split("@")[0]}`,
			{ headers: headers },
		);
		return data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"lib.appwrite.getUserByNipam",
			new Date().toISOString(),
			err.response?.data,
		);
		return null;
	}
};

export const getPrefsInUser = async (
	cookies: RequestCookies | ReadonlyRequestCookies,
	nipams: string[],
) => {
	return await Promise.all(
		nipams.map(async (nipam) => {
			const user = await getPrefs(cookies, nipam);
			return { nipam: nipam, roles: user?.roles };
		}),
	);
};

export const getPrefs = async (
	cookies: RequestCookies | ReadonlyRequestCookies,
	id: string,
) => {
	try {
		const token = cookies.get(sessionNames[2])?.value;
		const headers = appwriteHeader(cookies, token);

		const { data } = await axios.get(
			`${APPWRITE_ENDPOINT}/v1/users/${id}/prefs`,
			{ headers: headers },
		);
		return data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.user.get.prefs",
			new Date().toLocaleString(),
			err.response?.data,
			id,
		);
		throw new Error(String(err.response?.data));
	}
};

export const updateRoleUser = async (
	cookies: RequestCookies | ReadonlyRequestCookies,
	id: string,
	roles: string[],
) => {
	try {
		const token = cookies.get(sessionNames[2])?.value;
		const headers = appwriteHeader(cookies, token);

		const { status, data } = await axios.patch(
			`${APPWRITE_ENDPOINT}/v1/users/${id}/prefs`,
			{
				userId: id,
				prefs: { roles: roles },
			},
			{ headers: headers },
		);
		return new Response(JSON.stringify(data), { status });
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.user.update.pref",
			new Date().toLocaleString(),
			err.response?.data,
		);
		return new Response(JSON.stringify(err.response?.data), {
			status: err.response?.status,
		});
	}
};

export const getCurrentAccount = async (
	cookies: RequestCookies | ReadonlyRequestCookies,
) => {
	const token = cookies.get(sessionNames[2])?.value;
	const headers = appwriteHeader(cookies, token);
	try {
		const { data } = await axios.get(
			`${APPWRITE_ENDPOINT}/v1/account/current`,
			{ headers: headers },
		);
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
