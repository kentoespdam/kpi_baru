import { REMOTE_ORGANIZATION } from "@myTypes/entity/organization";
import axios from "axios";

export const getOrgInList = async (orgsId: string) => {
	try {
		const { data } = await axios.get(`${REMOTE_ORGANIZATION}/in/${orgsId}`);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.eo.organization.list",
			new Date().toISOString(),
			e.response
		);
		throw new Error(e.response.data.message);
	}
};
