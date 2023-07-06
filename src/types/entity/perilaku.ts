import { ApiResponse, Audit, BaseId, Pages } from "..";

export const LOCAL_PERILAKU = "/api/master/perilaku";
export const REMOTE_PERILAKU = `${process.env.KPI_API}/master/perilaku`;

export interface Perilaku extends BaseId {
	urut: number;
	kompetensi: string;
	uraian: string;
}

export interface PerilakuWithAudit extends Perilaku, Audit {}

export interface PerilakuWithPagination extends Pages<PerilakuWithAudit> {}

export interface PerilakuResponse extends ApiResponse<Perilaku[]> {}

export interface PerilakuPageResponse
	extends ApiResponse<PerilakuWithPagination> {}
