import { MyTableHead } from "@myTypes/table";
import { ApiResponse, Audit, AuditStatus, BaseId, Pages } from "..";
import { Level } from "./level";

export const LOCAL_PROFESI = "/api/master/profesi";
export const REMOTE_PROFESI = `${process.env.KPI_API}/master/profesi`;

export interface Profesi extends BaseId {
	name: string;
	level: Level;
}

export interface ProfesiData {
	id?: number;
	name: string;
	levelId: number;
	status: AuditStatus;
}

export interface ProfesiFilter {
	name: string;
	level: Level;
	status: AuditStatus;
}

export interface ProfesiWithAudit extends Profesi, Audit {}

export interface ProfesiWithPagination extends Pages<ProfesiWithAudit> {}

export interface ProfesiResponse extends ApiResponse<Profesi[]> {}

export interface ProfesiPageResponse
	extends ApiResponse<ProfesiWithPagination> {}

export const profesiHeader: MyTableHead[] = [
	{ field: null, title: "No", searchable: "false", width: 80 },
	{
		field: "name",
		title: "Profesi",
		searchable: "true",
		type: "text",
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
