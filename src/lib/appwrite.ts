import { Account, Client } from "appwrite";
import { authUrl, baseAuthUrl, projectId } from "./utils";

const client = new Client();
client.setEndpoint(baseAuthUrl).setProject(projectId);

export const account = new Account(client);
export { ID } from "appwrite";
