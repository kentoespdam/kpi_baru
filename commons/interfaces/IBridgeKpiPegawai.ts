import {
	EAuditStatus,
	IApiResponse,
	IAudit,
	IBaseId,
	IPageRequest,
	IPages,
	SelectType,
} from "./ICommons";
import { IEmployee } from "./IEmployee";
import { IKpi, isKpi } from "./IKpi";
import { ILevel, isLevel } from "./ILevel";
import { IOrganization } from "./IOrganization";

export const LOCAL_BRIDGE_KPI_PEGAWAI = "/api/bridge/kpi-pegawai";
export const REMOTE_BRIDGE_KPI_PEGAWAI = `${process.env.NEXT_API}/bridge/pegawai-kpi`;

export interface IBridgeKpiPegawai extends IBaseId {
	employee?: IEmployee;
	nipam: string;
	name: string;
	organizationId: number;
	positionId: number;
	level: ILevel;
	kpi: IKpi;
}

export const isBridgeKpiPegawai = (obj: any): obj is IBridgeKpiPegawai => {
	return (
		typeof obj === "object" &&
		typeof obj.id === "number" &&
		typeof obj.nipam === "string" &&
		typeof obj.name === "string" &&
		typeof obj.organizationId === "number" &&
		isLevel(obj.level) &&
		isKpi(obj.kpi)
	);
};

export const bridgeKpiPegawaiFilterType: SelectType[] = [
	{ id: "organization", label: "Organization", type: "organization" },
	{ id: "nipam", label: "NIPAM", type: "string" },
	{ id: "name", label: "Nama", type: "string" },
	{ id: "level", label: "Level", type: "level" },
	{ id: "kpi", label: "KPI", type: "kpi" },
	{ id: "status", label: "Status", type: "eAuditStatus" },
];

export interface IBridgeKpiPegawaiWithAudit extends IBridgeKpiPegawai, IAudit {}

export interface IBridgeKpiPegawaiForm {
	id?: number;
	employee?: IEmployee | null;
	nipam?: string;
	name?: string;
	organizationId?: number;
	positionId?: number;
	level?: ILevel | null;
	levelId?: number;
	kpi?: IKpi | null;
	kpiId?: number;
	status?: EAuditStatus;
}

export interface IBridgeKpiPegawaiRequest {
	id?: number;
	employee?: IEmployee;
	nipam?: string;
	name?: string;
	organization?: IOrganization;
	organizationId?: number;
	level?: ILevel;
	levelId?: number;
	kpi?: IKpi;
	kpiId?: number;
	status?: EAuditStatus;
}

export interface IPageBridgeKpiPegawaiRequest
	extends IPageRequest,
		IBridgeKpiPegawaiRequest {}

export interface IBridgeKpiPegawaiResponse
	extends IApiResponse<IBridgeKpiPegawai[]> {}

export interface IPageBridgeKpiPegawaiResponse
	extends IApiResponse<IPages<IBridgeKpiPegawaiWithAudit>> {}
