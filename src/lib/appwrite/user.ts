import axios from "axios";
import {
	APPWRITE_API_KEY,
	APPWRITE_ENDPOINT,
	APPWRITE_PROJECT_ID,
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
			}
		);

		data.prefs = await updateRoleUser(data.$id, defaultRoles);
		return data;
	} catch (e: any) {
		console.log(
			"lib.appwrite.create.user.account",
			new Date().toISOString(),
			e
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
		const { status, data } = await axios.get(
			`${APPWRITE_ENDPOINT}/v1/users/${nipam}`,
			{
				headers: {
					"Content-Type": "application/json",
					"X-Appwrite-Response-Format": "1.0.0",
					"X-Appwrite-Project": APPWRITE_PROJECT_ID,
					"X-Appwrite-Key": APPWRITE_API_KEY,
				},
			}
		);
		console.log(status);
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

export const getPrefsInUser = async (nipams: string[]) => {
	return await Promise.all(
		nipams.map(async (nipam) => {
			const user = await getPrefs(nipam);
			return { nipam: nipam, roles: user?.roles };
		})
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
			}
		);
		return data;
	} catch (e: any) {
		console.log(
			"api.user.get.prefs",
			new Date().toLocaleString(),
			e.response.data.message,
			id
		);
		throw new Error(e.response.data.message);
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
