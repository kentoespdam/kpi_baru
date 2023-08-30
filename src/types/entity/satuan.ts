import { MyTableHead } from "@myTypes/table";
import { ApiResponse, Audit, AuditStatus, BaseId, Pages } from "..";

export const LOCAL_SATUAN = "/api/master/satuan";
export const REMOTE_SATUAN = `${process.env.KPI_API}/master/satuan`;

export interface Satuan extends BaseId {
	satuan: string;
}

export interface SatuanData {
	id?: number;
	satuan: string;
	status: AuditStatus;
}

export interface SatuanFilter {
	satuan: string;
	status: AuditStatus;
}

export interface SatuanWithAudit extends Satuan, Audit {}

export interface SatuanWithPagination extends Pages<SatuanWithAudit> {}

export interface SatuanResponse extends ApiResponse<Satuan[]> {}

export interface SatuanPageResponse extends ApiResponse<SatuanWithPagination> {}

export const satuanHeader: MyTableHead[] = [
	{ field: "id", title: "No", searchable: "false", width: 80 },
	{
		field: "satuan",
		title: "Satuan",
		sortable: "true",
		searchable: "true",
		type: "text",
		width: 200,
	},
	{
		field: "status",
		title: "Status",
		searchable: "true",
		type: "auditStatus",
	},
	{ field: null, title: "Action", searchable: "false" },
];
