"use server";

import { account } from "@lib/appwrite";

export const doLogin = async (formData: FormData) => {
	const email = `${formData.get("email")}`;
	const password = `${formData.get("password")}`;

	console.log(email, password);
	// const validatedField = schema.safeParse({
	// 	email: formData.get("email"),
	// 	password: formData.get("password"),
	// });

	// console.log(formData);
	// const { headers, status, data } = await axios.post(
	// 	authUrl,
	// 	{
	// 		email: formData.get("email"),
	// 		password: formData.get("password"),
	// 	},
	// 	{
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			"X-Appwrite-Response-Format": "1.4.0",
	// 			"X-Appwrite-Project": projectId,
	// 		},
	// 	},
	// );
	// console.log(status);
	// console.log(data);
	// console.log(headers);

	// if (status !== 201) return data;
	// return data
	// console.log(formData.get("email"), formData.get("password"));
	// const sess = await account.createEmailSession(
	// 	String(formData.get("email")),
	// 	String(formData.get("password")),
	// );
	// console.log(sess);
	// return sess;
	return { result: "success" };
};
