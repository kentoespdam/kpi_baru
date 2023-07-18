import { MyTableHead } from "@myTypes/table";
import { ApiResponse, Audit, AuditStatus, BaseId, Pages } from "..";
import { Grade } from "./grade";
import { Organization } from "./organization";
import { Position } from "./position";
import { Profesi } from "./profesi";

export const LOCAL_KPI = "/api/master/kpi";
export const REMOTE_KPI = `${process.env.KPI_API}/master/kpi`;

export interface Kpi extends BaseId {
	organization: Organization;
	organizationId: number;
	position: Position;
	positionId: number;
	profesi: Profesi;
	name: string;
	grade: Grade;
}

export interface KpiData {
	id?: number;
	organizationId: number;
	positionId: number;
	profesiId: number;
	name: string;
	gradeId: number;
	status: AuditStatus;
}

export interface KpiFilter {
	organization: Organization;
	position: Position;
	profesi: Profesi;
	name: string;
	grade: Grade;
	status: AuditStatus;
}

export interface KpiWithAudit extends Kpi, Audit {}

export interface KpiWithPagination extends Pages<KpiWithAudit> {}

export interface KpiResponse extends ApiResponse<Kpi[]> {}

export interface KpiPageResponse extends ApiResponse<KpiWithPagination> {}

export const kpiHeader: MyTableHead[] = [
	{ field: "id", title: "No", searchable: "false", sortable: "true" },
	{
		field: "organization",
		title: "Organisasi",
		searchable: "true",
		type: "organization",
		sortable: "true",
	},
	{
		field: "position",
		title: "Posisi",
		searchable: "true",
		type: "position",
		sortable: "true",
	},
	{
		field: "profesi",
		title: "Profesi",
		searchable: "true",
		type: "profesi",
		sortable: "true",
	},
	{
		field: "name",
		title: "Nama KPI",
		searchable: "true",
		type: "text",
		sortable: "true",
	},
	{
		field: "grade",
		title: "Grade",
		searchable: "true",
		type: "grade",
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
