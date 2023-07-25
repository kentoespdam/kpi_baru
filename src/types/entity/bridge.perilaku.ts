import { MyTableHead } from "@myTypes/table";
import { ApiResponse, Audit, AuditStatus, BaseId, Pages } from "..";
import { Level } from "./level";
import { Perilaku } from "./perilaku";

export const LOCAL_BRIDGE_PERILAKU = "/api/bridge/perilaku";
export const REMOTE_BRIDGE_PERILAKU = `${process.env.KPI_API}/bridge/level-perilaku`;

export interface BridgePerilaku extends BaseId {
	perilaku: Perilaku;
	level?: Level;
}

export interface BridgePerilakuData {
	id?: number;
	levelId: number;
	status: AuditStatus;
}

export interface BridgePerilakuFilter {
	perilaku: Perilaku | null;
	level: Level | null;
	status: AuditStatus;
}

export interface BridgePerilakuWithAudit extends BridgePerilaku, Audit {}

export interface BridgePerilakuWithPagination
	extends Pages<BridgePerilakuWithAudit> {}

export interface BridgePerilakuResponse extends ApiResponse<BridgePerilaku[]> {}

export interface BridgePerilakuPageResponse
	extends ApiResponse<BridgePerilakuWithPagination> {}

export const bridgePerilakuHead: MyTableHead[] = [
	{
		field: "id",
		title: "No",
		searchable: "false",
		sortable: "true",
		width: 80,
	},
	{
		field: "perilaku",
		title: "Perilaku",
		searchable: "true",
		type: "perilaku",
		sortable: "true",
	},
	{
		field: "level",
		title: "Level",
		searchable: "true",
		type: "level",
		sortable: "true",
	},
	{
		field: "status",
		title: "Status",
		searchable: "true",
		type: "auditStatus",
	},
	{ field: null, title: "Action", searchable: "false", width: 100 },
];
