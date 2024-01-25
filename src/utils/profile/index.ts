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
	} catch (e) {
const err = e as unknown as AxiosError;
		console.log(
			"utils.profile.update.password",
			new Date().toISOString(),
			err.response?.data,
		);
		throw new Error(err.response?.data,);
	}
};
