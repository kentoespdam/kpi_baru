import { ApiResponse, Audit, AuditStatus, BaseId, Pages } from "..";
import { Kpi } from "./kpi";
import { UraianWithAudit, UraianWithFile } from "./uraian";

export const LOCAL_INDIKATOR = "/api/master/indikator";
export const REMOTE_INDIKATOR = `${process.env.KPI_API}/master/indikator`;

export interface Indikator extends BaseId {
	kpi?: Kpi;
	kpiId: number;
	indikator: string;
	urut: number;
}

export interface IndikatorData {
	id?: number;
	kpiId: number;
	indikator: string;
	urut: number;
	status: AuditStatus;
}

export interface IndikatorFilter {
	kpiId: number | null;
	indikator: string | null;
	status: AuditStatus;
}

export interface IndikatorWithAudit extends Indikator, Audit {}

export interface IndikatorWithUraianList extends IndikatorWithAudit {
	uraianList: UraianWithFile[];
}

export interface IndikatorWithPagination extends Pages<IndikatorWithAudit> {}

export interface IndikatorResponse extends ApiResponse<Indikator[]> {}

export interface IndikatorPageResponse
	extends ApiResponse<IndikatorWithPagination> {}
