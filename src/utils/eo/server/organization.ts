import { REMOTE_ORGANIZATION } from "@myTypes/entity/organization";
import axios, { AxiosError } from "axios";

export const getOrgInList = async (orgsId: string) => {
	try {
		const { data } = await axios.get(`${REMOTE_ORGANIZATION}/in/${orgsId}`);
		return data.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.eo.organization.list",
			new Date().toISOString(),
			err.response?.data,
		);
		throw new Error(JSON.stringify(err.response?.data));
	}
};
