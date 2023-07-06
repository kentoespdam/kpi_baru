import { ApiResponse, Audit, BaseId, Pages } from "..";
import { Level } from "./level";

export const LOCAL_PROFESI = "/api/master/profesi";
export const REMOTE_PROFESI = `${process.env.KPI_API}/master/profesi`;

export interface Profesi extends BaseId {
	name: string;
	level: Level;
}

export interface ProfesiWithAudit extends Profesi, Audit {}

export interface ProfesiWithPagination extends Pages<ProfesiWithAudit> {}

export interface ProfesiResponse extends ApiResponse<Profesi[]> {}

export interface ProfesiPageResponse
	extends ApiResponse<ProfesiWithPagination> {}
