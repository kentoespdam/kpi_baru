import { ApiResponse, Audit, BaseId, Pages } from "..";
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

export interface KpiWithAudit extends Kpi, Audit {}

export interface KpiWithPagination extends Pages<KpiWithAudit> {}

export interface KpiResponse extends ApiResponse<Kpi[]> {}

export interface KpiPageResponse extends ApiResponse<KpiWithPagination> {}
