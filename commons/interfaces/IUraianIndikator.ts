import {
	EAuditStatus,
	IApiResponse,
	IAudit,
	IBaseId,
	IPageRequest,
	IPages,
	SelectType,
} from "./ICommons";
import { IIndikator } from "./IIndikator";
import { IKpi } from "./IKpi";

export const LOCAL_URAIAN_INDIKATOR = "/api/master/uraian-indikator";
export const REMOTE_URAIAN_INDIKATOR = `${process.env.NEXT_API}/master/uraian-indikator`;

export interface IUraianIndikator extends IBaseId {
	indikator: IIndikator;
	uraian: string;
	volume: number;
	satuan: string;
	waktu: string;
	bobot: number;
}

export const uraianIndikatorFilterType: SelectType[] = [
	{ id: "kpi", label: "KPI", type: "kpi" },
	{ id: "indikator", label: "Indikator", type: "indikator" },
	{ id: "uraian", label: "Uraian", type: "string" },
	{ id: "status", label: "Status", type: "eAuditStatus" },
];

export interface IUraianIndikatorWithAudit extends IUraianIndikator, IAudit {}

export interface IUraianIndikatorForm {
	id?: number;
	kpi?: IKpi | null;
	indikator?: IIndikator | null;
	indikatorId?: number;
	uraian?: string;
	volume?: number;
	satuan?: string;
	waktu?: string;
	bobot?: number;
	status?: EAuditStatus;
}

export interface IUraianIndikatorRequest {
	uraian?: string;
	indikator?: IIndikator | null;
	indikatorId?: number;
	kpi?: IKpi | null;
	kpiId?: number;
	status?: EAuditStatus;
}

export interface IPageUraianIndikatorRequest
	extends IPageRequest,
		IUraianIndikatorRequest {}

export interface IUraianIndikatorResponse
	extends IApiResponse<IUraianIndikatorWithAudit[]> {}

export interface IPageUraianIndikatorResponse
	extends IApiResponse<IPages<IUraianIndikatorWithAudit>> {}
