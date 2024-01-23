import { account } from "@lib/appwrite";

export const getJWT = async (): Promise<string | null> => {
	const jwt = window?.localStorage.getItem("jwt");
	const jwtExpires = window?.localStorage.getItem("jwtExpires");
	if (jwt && jwtExpires && +jwtExpires > Date.now()) {
		return jwt;
	}

	try {
		const jwt = await account().createJWT();
		setJWT(jwt.jwt);
		return await getJWT();
	} catch (errors) {
		return null;
	}
};

export const setJWT = (jwt: string) => {
	const jwtExpires = Date.now() + 15 * 60 * 1000;
	window?.localStorage.setItem("jwt", jwt);
	window?.localStorage.setItem("jwtExpires", jwtExpires.toString());
};
