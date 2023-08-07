import axios from "axios";
import {
	APPWRITE_ENDPOINT,
	APPWRITE_PROJECT_ID,
	APPWRITE_API_KEY,
	defaultRoles,
} from "..";

export const createUserAccount = async (account: {
	userId: string;
	email: string;
	password: string;
	name: string;
}) => {
	try {
		const user = await getUserByNipam(account.userId);
		if (user) return user;

		const { data } = await axios.post(
			`${APPWRITE_ENDPOINT}/v1/account`,
			account,
			{
				headers: {
					"Content-Type": "Application/json",
					"X-Appwrite-Response-Format": "1.0.0",
					"X-Appwrite-Project": APPWRITE_PROJECT_ID,
					"X-Appwrite-Key": APPWRITE_API_KEY,
				},
			}
		);

		data.prefs = await updateRoleUser(data.$id, defaultRoles);
		return data;
	} catch (e: any) {
		console.log(
			"lib.appwrite.create.user.account",
			new Date().toISOString(),
			e.response.data
		);
		return null;
	}
};

export const getAllUser = async () => {
	try {
		const { data } = await axios.get(`${APPWRITE_ENDPOINT}/v1/users`, {
			headers: {
				"X-Appwrite-Response-Format": "1.0.0",
				"X-Appwrite-Project": APPWRITE_PROJECT_ID,
				"X-Appwrite-Key": APPWRITE_API_KEY,
			},
		});
		return data;
	} catch (e: any) {
		console.log(
			"lib.appwrite.getAllUser",
			new Date().toISOString(),
			e.response.data
		);
		return null;
	}
};

export const getUserByNipam = async (nipam: string) => {
	try {
		const { data } = await axios.get(
			`${APPWRITE_ENDPOINT}/v1/users/${nipam}`,
			{
				headers: {
					"X-Appwrite-Response-Format": "1.0.0",
					"X-Appwrite-Project": APPWRITE_PROJECT_ID,
					"X-Appwrite-Key": APPWRITE_API_KEY,
				},
			}
		);
		return data;
	} catch (e: any) {
		console.log(
			"li.appwrite.getUserByNipam",
			new Date().toISOString(),
			e.response.data
		);
		return null;
	}
};

export const getPrefs = async (id: string) => {
	try {
		const { data } = await axios.get(
			`${APPWRITE_ENDPOINT}/v1/users/${id}/prefs`,
			{
				headers: {
					"X-Appwrite-Response-Format": "1.0.0",
					"X-Appwrite-Project": APPWRITE_PROJECT_ID,
					"X-Appwrite-Key": APPWRITE_API_KEY,
				},
			}
		);
		return data;
	} catch (e: any) {
		console.log(
			"api.user.get.prefs",
			new Date().toLocaleString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const updateRoleUser = async (id: string, roles: string[]) => {
	console.log("appwrite.user.update.role", id, roles);
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
			}
		);
		return new Response(JSON.stringify(data), { status });
	} catch (e: any) {
		console.log(
			"api.user.update.pref",
			new Date().toLocaleString(),
			e.response.data
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
