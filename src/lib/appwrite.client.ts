import axios, { AxiosError } from "axios";

export const getSession = async () => {
	try {
		const { status, data } = await axios.get("/api/auth/session");
		if (status !== 200) throw Error("Unauthorized");
		return data;
	} catch (e) {
		const err=e as unknown as AxiosError
		throw Error(JSON.stringify(err.response?.data));
	}
};
