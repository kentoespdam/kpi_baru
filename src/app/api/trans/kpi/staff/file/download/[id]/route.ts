import { getCurrentToken } from "@helper/index";
import { REMOTE_URAIAN_FILE } from "@myTypes/entity/uraian.file";
import axios, { AxiosError } from "axios";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: number } },
) => {
	const { id } = params;
	const cookies = req.cookies;
	const headerList = headers();
	const hostname = String(headerList.get("host")).split(":")[0];

	try {
		const token = await getCurrentToken(cookies, hostname);
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		let resHeader: any;
		const data = await fetch(`${REMOTE_URAIAN_FILE}/${id}/file`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		}).then((res) => {
			resHeader = res.headers;
			return res.blob();
		});

		return new Response(data, {
			headers: resHeader,
		});
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"api.kpi.file.download.id",
			new Date().toISOString(),
			err.response?.data,
		);
		return new Response(JSON.stringify(err.response?.data), { status: 500 });
	}
};
