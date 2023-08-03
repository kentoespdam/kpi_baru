import axios from "axios";

export const createAccount = () => {};

export const updatePassword = async ({
	oldPass,
	newPass,
}: {
	oldPass: string;
	newPass: string;
}) => {
	try {
		const { data } = await axios.patch("/api/auth/account/password", {
			oldPass,
			newPass,
		});
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.profile.update.password",
			new Date().toISOString(),
			e.response.data.message
		);
		throw new Error(e.response.data.message);
	}
};
