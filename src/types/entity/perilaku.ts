import { MyTableHead } from "@myTypes/table";
import { ApiResponse, Audit, AuditStatus, BaseId, Pages } from "..";

export const LOCAL_PERILAKU = "/api/master/perilaku";
export const REMOTE_PERILAKU = `${process.env.KPI_API}/master/perilaku`;

export interface Perilaku extends BaseId {
	urut: number;
	kompetensi: string;
	uraian: string;
}

export interface PerilakuData {
	id?: number;
	kompetensi: string;
	urut: number;
	uraian: string;
	status: AuditStatus;
}

export interface PerilakuWithAudit extends Perilaku, Audit {}

export interface PerilakuWithPagination extends Pages<PerilakuWithAudit> {}

export interface PerilakuResponse extends ApiResponse<Perilaku[]> {}

export interface PerilakuPageResponse
	extends ApiResponse<PerilakuWithPagination> {}

export const perilakuHeader: MyTableHead[] = [
	{
		field: "id",
		title: "No",
		searchable: "false",
		sortable: "true",
		width: 80,
	},
	{
		field: "kompetensi",
		title: "Kompetensi",
		searchable: "true",
		type: "text",
		sortable: "true",
	},
	{
		field: "uraian",
		title: "Uraian",
		searchable: "true",
		type: "text",
		sortable: "true",
	},
	{ field: "urut", title: "Urut", searchable: "false", sortable: "false" },
	{
		field: "status",
		title: "Status",
		searchable: "true",
		type: "auditStatus",
	},
	{ field: null, title: "Action", searchable: "false", width: 100 },
];
