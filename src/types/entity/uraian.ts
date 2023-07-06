import { ApiResponse, Audit, BaseId, Pages } from "..";
import { Indikator } from "./indikator";

export const LOCAL_URAIAN = "/api/master/uraian";
export const REMOTE_URAIAN = `${process.env.KPI_API}/master/uraian-indikator`;

export interface Uraian extends BaseId {
	indikator: Indikator;
	uraian: string;
	volume: number;
	satuan: string;
	waktu: string;
	bobot: number;
}

export interface UraianWithAudit extends Uraian, Audit {}

export interface UraianWithPagination extends Pages<UraianWithAudit> {}

export interface UraianResponse extends ApiResponse<Uraian[]> {}

export interface UraianPageResponse extends ApiResponse<UraianWithPagination> {}
