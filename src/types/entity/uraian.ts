import { ApiResponse, Audit, AuditStatus, BaseId, Pages } from "..";
import { Indikator } from "./indikator";
import { UraianFile } from "./uraian.file";

export const LOCAL_URAIAN = "/api/master/uraian";
export const REMOTE_URAIAN = `${process.env.KPI_API}/master/uraian-indikator`;

export interface Uraian extends BaseId {
	indikator: Indikator;
	uraian: string;
	volume: number;
	satuan: string;
	target: "MIN" | "MAX";
	waktu: string;
	bobot: number;
}

export interface UraianData {
	id?: number;
	indikatorId: number;
	uraian: string;
	volume: number;
	satuan: string;
	target: "MIN" | "MAX";
	waktu: string;
	bobot: number;
	status: AuditStatus;
}

export interface UraianFilter {
	indikatorId: number | null;
	uraian: string | null;
	kpiId: number | null;
	profesiId: number | null;
	levelId: number | null;
	status: AuditStatus;
}

export interface UraianWithAudit extends Uraian, Audit {}

export interface UraianWithFile extends UraianWithAudit {
	fileList: UraianFile[];
}

export interface UraianWithPagination extends Pages<UraianWithAudit> {}

export interface UraianResponse extends ApiResponse<Uraian[]> {}

export interface UraianPageResponse extends ApiResponse<UraianWithPagination> {}
