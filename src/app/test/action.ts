"use server";

import { cookieStringToObject } from "@helpers/index";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { signInSchema } from "../auth/page";

export const doAction = async (formData: FormData) => {
	const data = Object.fromEntries(formData);
	console.log(data);
	// try {
		const res = signInSchema.parse({
            email: data.email,
            password: data.password,
        });
		console.log(res);
	// } catch (e) {
		// console.log(e);
	// }
	const headerList = headers();
	const callbackUrl = cookies().get("callback_url")?.value;
	// console.log(new URL(`${callbackUrl}`).href);
	const kukistring =
		"a_session_6459bce73b2d132c8142_legacy=eyJpZCI6IjkwMDgwMDQ1NiIsInNlY3JldCI6ImYzMDc5ZjBhZmQ2N2NlNGRiN2VjYjM1MzkyZWVhYzMwMDhmMDRlZThkNjc3OWJkYjA5ODZkNDg3ODlkOGUwNmY0Y2Y5YjNmOTExZjZhOTUxZWQ5ZjQ3ZmZhMWIzN2U0NDljNjhkNDcwMzc0NzUzM2U2YzdhYmE2MjAwMDRlNmEwZmQzODVlY2VlM2JjYTE0MmE0NGY5MjEzZjRmYmJhZjkxZjNlMDllMmRhZjcwZDZmOWVmM2RkMTFkZmM0NDMzN2EwODUzZWYyMDNmMmNjOWMzNDhmYTVmNjY1YjNkOGJlNjE0MGU2ZjI0MDgyMzkwZDE3MzJjYjk3ODliZmRmMDgifQ%3D%3D; expires=Mon, 20-Nov-2023 06:59:37 GMT; path=/; domain=.auth.tirtasatria.tech; secure; httponly";

	const rdus = cookieStringToObject(kukistring, headerList);
	// redirect(new URL(`${callbackUrl}`).href);

	// console.log(rdus);
	// cookies().set(rdus.name, rdus.value, rdus);
};
