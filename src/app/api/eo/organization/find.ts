import {
	Organization,
	REMOTE_ORGANIZATION,
} from "@myTypes/entity/organization";
import axios from "axios";

export const getOrganizationById = async (
	organizationId: number,
	token: string,
): Promise<Organization> => {
	const { data } = await axios.get(`${REMOTE_ORGANIZATION}/${organizationId}`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	});

	return data.data;
};
