import axios, { AxiosError } from "axios";
import {
	APPWRITE_API_KEY,
	APPWRITE_ENDPOINT,
	APPWRITE_PROJECT_ID,
	defaultRoles,
	sessionNames,
} from "@lib/index";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { appwriteHeader } from "@helper/index";

export const createUserAccount = async (account: {
	userId: string;
	email: string;
	password: string;
	name: string;
}) => {
	try {
		const user = await getUserByNipam(account.userId);
		if (user !== null) return user;

		const { status, data } = await axios.post(
			`${APPWRITE_ENDPOINT}/v1/users`,
			account,
			{
				headers: {
					"Content-Type": "application/json",
					"X-Appwrite-Response-Format": "1.0.0",
					"X-Appwrite-Project": APPWRITE_PROJECT_ID,
					"X-Appwrite-Key": APPWRITE_API_KEY,
				},
			},
		);

		data.prefs = await updateRoleUser(data.$id, defaultRoles);
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

export const getAllUser = async () => {
	try {
		const { data } = await axios.get(`${APPWRITE_ENDPOINT}/v1/users`, {
			headers: {
				"Content-Type": "application/json",
				"X-Appwrite-Response-Format": "1.0.0",
				"X-Appwrite-Project": APPWRITE_PROJECT_ID,
				"X-Appwrite-Key": APPWRITE_API_KEY,
			},
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

export const getUserByNipam = async (nipam: string) => {
	try {
		const { data } = await axios.get(
			`${APPWRITE_ENDPOINT}/v1/users/${nipam.split("@")[0]}`,
			{
				headers: {
					"Content-Type": "application/json",
					"X-Appwrite-Response-Format": "1.0.0",
					"X-Appwrite-Project": APPWRITE_PROJECT_ID,
					"X-Appwrite-Key": APPWRITE_API_KEY,
				},
			},
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

export const getPrefsInUser = async (nipams: string[]) => {
	return await Promise.all(
		nipams.map(async (nipam) => {
			const user = await getPrefs(nipam);
			return { nipam: nipam, roles: user?.roles };
		}),
	);
};

export const getPrefs = async (id: string) => {
	try {
		const { data } = await axios.get(
			`${APPWRITE_ENDPOINT}/v1/users/${id}/prefs`,
			{
				headers: {
					"Content-Type": "application/json",
					"X-Appwrite-Response-Format": "1.0.0",
					"X-Appwrite-Project": APPWRITE_PROJECT_ID,
					"X-Appwrite-Key": APPWRITE_API_KEY,
				},
			},
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

export const updateRoleUser = async (id: string, roles: string[]) => {
	try {
		const { status, data } = await axios.patch(
			`${APPWRITE_ENDPOINT}/v1/users/${id}/prefs`,
			{
				userId: id,
				prefs: { roles: roles },
			},
			{
				headers: {
					"Content-Type": "application/json",
					"X-Appwrite-Response-Format": "1.0.0",
					"X-Appwrite-Project": APPWRITE_PROJECT_ID,
					"X-Appwrite-Key": APPWRITE_API_KEY,
				},
			},
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
	cookieString?: string[],
) => {
	const token = cookies.get(sessionNames[2])?.value;
	const headers = appwriteHeader(cookies, token);
	try {
		const { data } = await axios.get(
			`${APPWRITE_ENDPOINT}/v1/account/current`,
			{
				headers: headers,
			},
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
