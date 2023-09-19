import { responseNoContent } from "@helper/error/nocontent";
import { getCurrentToken } from "@helper/index";
import {
	BridgeKpiWithAudit,
	REMOTE_BRIDGE_KPI,
} from "@myTypes/entity/bridge.kpi";
import {
	Organization
} from "@myTypes/entity/organization";
import { Position } from "@myTypes/entity/position";
import { getOrgInList } from "@utils/eo/server/organization";
import { getPosInList } from "@utils/eo/server/position";
import axios from "axios";
import { NextRequest } from "next/server";
import { DEFAULT_MAIL_DOMAIN } from "src/lib";
import { createUserAccount, getPrefsInUser } from "src/lib/appwrite/user";

export const revalidate = 0;

const findPosition = (
	posList: Position[],
	posId: number
): Promise<Position> => {
	return new Promise((resolve, reject) => {
		const pos = posList.find((pos: Position) => pos.id === posId);
		pos ? resolve(pos) : reject("Position not found");
	});
};

export const GET = async (req: NextRequest) => {
	const cookie = req.cookies;
	const search = req.nextUrl.search;

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.get(
			`${REMOTE_BRIDGE_KPI}/page${search}`,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
			}
		);

		const content = data.data.content.map((kpi: BridgeKpiWithAudit) => kpi);
		const orgsId = content
			.map((kpi: BridgeKpiWithAudit) => kpi.organizationId)
			.join(",");
		const postsId = content
			.map((kpi: BridgeKpiWithAudit) => kpi.positionId)
			.join(",");

		const nipams = content.map((kpi: BridgeKpiWithAudit) => kpi.nipam);

		const [orgData, posData, prefsList] = await Promise.all([
			await getOrgInList(orgsId),
			await getPosInList(postsId),
			await getPrefsInUser(nipams),
		]);

		await Promise.all(
			content.map(async (kpi: BridgeKpiWithAudit) => {


				kpi.organization = await new Promise((resolve, reject) => {
					const org = orgData.find(
						(org: Organization) => org.id === kpi.organizationId
					);
					org ? resolve(org) : reject("Organization not found");
				});

				kpi.position = await new Promise((resolve, reject) => {
					const pos = posData.find(
						(pos: Position) => pos.id === kpi.positionId
					);
					pos ? resolve(pos) : reject("Position not found");
				});
				kpi.roles = await new Promise((resolve, reject) => {
					const prefs = prefsList.find(
						(user: { nipam: string; roles: string[] }) =>
							user.nipam === kpi.nipam
					);
					prefs ? resolve(prefs.roles) : reject("Roles not found");
				});

				return kpi;
			})
		);

		data.data.content = content;

		if (status === 204) return responseNoContent();
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log(
			"api.bridge.kpi.get",
			new Date().toString(),
			e.response.data
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};

export const POST = async (req: NextRequest) => {
	const cookie = req.cookies;
	const body = await req.json();

	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.post(REMOTE_BRIDGE_KPI, body, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": token,
			},
		});
		if (status === 201)
			await createUserAccount({
				userId: body.nipam,
				email: `${body.nipam}@${DEFAULT_MAIL_DOMAIN}`,
				name: body.name,
				password: `${process.env.DEFAULT_PASSWORD}`,
			});
		return new Response(JSON.stringify(data), { status: status });
	} catch (e: any) {
		console.log(
			"api.bridge.kpi.post",
			new Date().toString(),
			e.response.data
		);
		return new Response(JSON.stringify(e.response.data), {
			status: e.response.status,
		});
	}
};
