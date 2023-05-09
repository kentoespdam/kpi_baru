import {
	EAuditStatus,
	IApiResponse,
	IAudit,
	IBaseId,
	IPageRequest,
	IPages,
	SelectType,
} from "./ICommons";
import { IKpi } from "./IKpi";

export const LOCAL_INDIKATOR = "/api/master/indikator";
export const REMOTE_INDIKATOR = `${process.env.NEXT_API}/master/indikator`;

export interface IIndikator extends IBaseId {
	kpi?: IKpi;
	kpiId: number;
	indikator: string;
	urut: number;
}

export const indikatorFilterType: SelectType[] = [
	{ id: "kpi", label: "KPI", type: "kpi" },
	{ id: "indikator", label: "Indikator", type: "string" },
	{ id: "status", label: "Status", type: "eAuditStatus" },
];

export interface IIndikatorWithAudit extends IIndikator, IAudit {}

export interface IIndikatorForm {
	id?: number;
	kpi?: IKpi | null;
	kpiId?: number;
	indikator?: string;
	urut?: number;
	status?: EAuditStatus;
}

export interface IIndikatorRequest {
	id?: number;
	kpi?: IKpi | null;
	kpiId?: number;
	indikator?: string;
	urut?: number;
	status?: EAuditStatus;
}

export interface IPageIndikatorRequest
	extends IPageRequest,
		IIndikatorRequest {}

export interface IIndikatorResponse
	extends IApiResponse<IIndikatorWithAudit[]> {}

export interface IPageIndikatorResponse
	extends IApiResponse<IPages<IIndikatorWithAudit>> {}
