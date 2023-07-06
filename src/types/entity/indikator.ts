import { ApiResponse, Audit, BaseId, Pages } from "..";
import { Kpi } from "./kpi";

export const LOCAL_INDIKATOR = "/api/master/indikator";
export const REMOTE_INDIKATOR = `${process.env.KPI_API}/master/indikator`;

export interface Indikator extends BaseId {
	kpi?: Kpi;
	kpiId: number;
	indikator: string;
	urut: number;
}

export interface IndikatorWithAudit extends Indikator, Audit {}

export interface IndikatorWithPagination extends Pages<Indikator> {}

export interface IndikatorResponse extends ApiResponse<Indikator[]> {}

export interface IndikatorPageResponse
	extends ApiResponse<IndikatorWithPagination> {}
