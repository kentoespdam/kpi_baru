import axios from "axios";

export const getSession = async () => {
	try {
		const { status, data } = await axios.get("/api/auth/session");
		if (status !== 200) throw Error("Unauthorized");
		return data;
	} catch (e) {
		throw Error(JSON.stringify(e.message));
	}
};
