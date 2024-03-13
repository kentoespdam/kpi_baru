import { AcceptedStatus, ApiResponse, Audit, BaseId, Pages } from "..";
import { Profesi } from "./profesi";
import { TransIndikator } from "./trans.indikator";

export const LOCAL_TRANS_KPI = "/api/trans/kpi";
export const REMOTE_TRANS_KPI = `${process.env.KPI_API}/transaction/kpi`;

export interface TransKpi extends BaseId {
	nipam: string;
	organizationId: number;
	positionId: number;
	profesi: Profesi;
	periode: string;
	name: string;
	nilaiTotal: number;
	lockedStatus: AcceptedStatus;
	indikatorList: TransIndikator[];
}

export interface TransKpiWithAudit extends TransKpi, Audit {}

export interface TransKpiWithPagination extends Pages<TransKpiWithAudit> {}

export interface TransKpiSingleResponse extends ApiResponse<TransKpi> {}
export interface TransKpiResponse extends ApiResponse<TransKpi[]> {}

export interface TransKpiPageResponse
	extends ApiResponse<TransKpiWithPagination> {}

export interface TransKpiQKeyProps {
	nipam: string | null;
	kpiId?: number | null;
	periode?: number | null;
}
