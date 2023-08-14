"use server";

import { getCurrentToken } from "@helper/index";
import { REMOTE_URAIAN_FILE } from "@myTypes/entity/uraian.file";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export const handleSubmitServer = async (body: FormData) => {
	const cookie = cookies();
	const header = headers();

	const file = body.get("file") as File;
	if (!file) return null;

	try {
		const token = await getCurrentToken(cookie);
		const myHeader = {
			"Connection": header.get("connection")!,
			"accept-encoding": header.get("accept-encoding")!,
			"accept": "*/*",
			"cookie": header.get("cookie")!,
			"X-Appwrite-JWT": token,
		};

		const data = await fetch(REMOTE_URAIAN_FILE, {
			method: "POST",
			body: body,
			headers: myHeader,
		});

		// const h = data.headers;
		// h.forEach((v, k) => console.log(`${k}:${v}`));

		const status = data.status;
		const json = await data.json();

		// console.log("server action", status, json);
		return JSON.stringify(json);
	} catch (e: any) {
		console.log("server action", e);
	}
};
