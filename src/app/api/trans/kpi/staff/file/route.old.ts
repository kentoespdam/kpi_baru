import { appwriteHeader, getCurrentToken } from "@helper/index";
import { REMOTE_URAIAN_FILE } from "@myTypes/entity/uraian.file";
import axios from "axios";
import { NextRequest } from "next/server";

export const maxDuration = 30;

export const POST = async (req: NextRequest) => {
	const cookie = req.cookies;
	const body = await req.formData();
	const file: File | null = body.get("file") as unknown as File;

	const formData = new FormData();
	formData.set("periode", body.get("periode")!);
	formData.set("nipam", body.get("nipam")!);
	formData.set("transKpiUraianId", body.get("transKpiUraianId")!);
	formData.set("file", file);

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.post(
			REMOTE_URAIAN_FILE,
			formData,
			{
				headers: {
					...appwriteHeader(cookie, token, "multipart/form-data"),
					Accept: "*/*",
				},
				onUploadProgress: (e) => {
					console.log("size: ", file.size, e.bytes, "of", e.total);
					console.log("rate: ", (e.bytes! / e.total!) * 100);
					console.log("progress: ", e.progress! * 100);
				},
			}
		);
		return new Response(JSON.stringify(data.data), { status });
	} catch (e: any) {
		console.log(
			"api.trans.kpi.staff.file.post",
			new Date().toISOString(),
			e.response.data.message
		);
		return new Response(e.response.data.message, { status: 400 });
	}
};
