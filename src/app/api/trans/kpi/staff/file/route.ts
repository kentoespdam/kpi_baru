import { appwriteHeader, getCurrentToken } from "@helper/index";
import { REMOTE_URAIAN_FILE } from "@myTypes/entity/uraian.file";
import axios from "axios";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
	const cookie = req.cookies;
	console.log(req.nextUrl.hostname);
	console.log(req.nextUrl.port);
	const body = await req.formData();
	console.log(req.headers);

	const file = body.get("file") as File;
	const ab = await file.arrayBuffer();
	console.log(file.name, file.size, ab.byteLength);

	const formData = new FormData();
	formData.append("periode", body.get("periode") as string);
	formData.append("nipam", body.get("nipam") as string);
	formData.append("transKpiUraianId", body.get("transKpiUraianId") as string);
	formData.append("file", new Blob([ab]), file.name);

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.post(REMOTE_URAIAN_FILE, body, {
			headers: {
				...appwriteHeader(cookie, token, "multipart/form-data"),
				"Accept": "*/*",
				"Content-Length": req.headers.get("content-length")!,
			},
			onUploadProgress: (e) => {
				console.log("rate: ", (e.bytes! / e.total!) * 100);
				console.log("progress: ", e.progress! * 100);
			},
		});
		return new Response(JSON.stringify(data.data), { status });
	} catch (e: any) {
		console.log(
			"api.trans.kpi.staff.file.post",
			new Date().toISOString(),
			e.response
		);
		return new Response(e.response.data.message, { status: 400 });
	}
};
