import { MyTableHead } from "@myTypes/table";
import { ApiResponse, Audit, AuditStatus, BaseId, Pages } from "..";
import { Employee } from "./employee";
import { Kpi } from "./kpi";
import { Level } from "./level";
import { Organization } from "./organization";
import { Position } from "./position";

export const LOCAL_BRIDGE_KPI = "/api/bridge/kpi";
export const REMOTE_BRIDGE_KPI = `${process.env.KPI_API}/bridge/pegawai-kpi`;

export interface BridgeKpi extends BaseId {
	employee?: Employee;
	nipam: string;
	name: string;
	organization?: Organization;
	organizationId: number;
	position?: Position;
	positionId: number;
	level: Level;
	kpi: Kpi;
}

export interface BridgeKpiData {
	id?: number;
	nipam: string;
	positionId: number;
	organizationId: number;
	levelId: number;
	kpiId: number;
	status: AuditStatus;
}

export interface BridgeKpiFilter {
	nipam: string | null;
	name: string | null;
	positionId: number | null;
	organizationId: number | null;
	levelId: number | null;
	kpiId: number | null;
	status: AuditStatus;
}

export interface BridgeKpiWithAudit extends BridgeKpi, Audit {}

export interface BridgeKpiWithPagination extends Pages<BridgeKpiWithAudit> {}

export interface BridgeKpiResponse extends ApiResponse<BridgeKpi[]> {}

export interface BridgeKpiPageResponse
	extends ApiResponse<BridgeKpiWithPagination> {}

export const bridgeKpiHead: MyTableHead[] = [
	{ field: "id", title: "No", searchable: "false", sortable: "true" },
	{
		field: "nipam",
		title: "NIPAM",
		searchable: "true",
		type: "text",
		sortable: "true",
	},
	{
		field: "name",
		title: "Nama",
		searchable: "true",
		type: "text",
		sortable: "true",
	},
	{
		field: "position",
		title: "Posisi",
		searchable: "false",
		sortable: "true",
	},
	{
		field: "organization",
		title: "Organisasi",
		searchable: "false",
		sortable: "true",
	},
	{ field: "level", title: "Level", searchable: "false", sortable: "true" },
	{ field: "kpi", title: "KPI", searchable: "false", sortable: "true" },
	{
		field: "status",
		title: "Status",
		searchable: "true",
		type: "auditStatus",
	},
	{ field: null, title: "Action", searchable: "false", width: 100 },
];
