import { getCurrentToken } from "@helper/index";
import { REMOTE_URAIAN_FILE } from "@myTypes/entity/uraian.file";
import axios from "axios";
import { readFile, unlink, writeFile } from "fs/promises";
import { cookies } from "next/headers";

export const POST = async (req: Request) => {
	const cookie = cookies();
	const body = await req.formData();
	const file = body.get("file") as File;
	const reqHeader: Record<string, any> = {};
	req.headers.forEach((value, key) => {
		reqHeader[key] = value;
	});

	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);

	const path = `./tmp/${file.name}`;
	await writeFile(path, buffer);

	const uploadedFile = await readFile(path);
	const blobFile = new Blob([uploadedFile], { type: file.type });

	const formData = new FormData();
	formData.append("periode", body.get("periode") as string);
	formData.append("nipam", body.get("nipam") as string);
	formData.append("transKpiUraianId", body.get("transKpiUraianId") as string);
	formData.append("file", blobFile, file.name);

	try {
		const token = await getCurrentToken(cookie);
		const { status, data, headers } = await axios.post(
			REMOTE_URAIAN_FILE,
			formData,
			{
				headers: {
					...reqHeader,
					Authorization: token,
				},
				onUploadProgress: (e) => {
					console.log("bytes: ", e.bytes);
					console.log("total: ", e.total);
					console.log("loaded: ", e.loaded);
					console.log("percent: ", (e.bytes! / e.total!) * 100);
				},
			}
		);

		await unlink(path);
		return new Response(JSON.stringify(data), { status });
	} catch (e: any) {
		console.log(
			"api.trans.kpi.staff.file.post",
			new Date().toISOString(),
			e.response.data
		);
		await unlink(path);

		return new Response(JSON.stringify(e.response.data), {
			status: 400,
		});
	}
};
