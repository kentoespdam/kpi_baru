import { APPWRITE_ENDPOINT } from ".";
import { appwriteHeader } from "@helper/index";

export const getAppwriteSession = async (sessCookie: string) => {
	try {
		const req = await fetch(
			`${APPWRITE_ENDPOINT}/v1/account/sessions/current`,
			{
				headers: appwriteHeader(sessCookie),
			}
		);
		const res = await req.json();
		return res;
	} catch (e: any) {
		console.log("lib.appwrite.getAppwriteSession", e);
	}
};
