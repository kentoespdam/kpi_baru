import { baseAuthUrl, projectId } from "@utils/index";
import { Account, Client } from "appwrite";

const client = new Client();
client.setEndpoint(baseAuthUrl);
client.setProject(projectId);

export const account = (jwt?: string) => {
	if (jwt) client.setJWT(jwt);
	return new Account(client);
};
