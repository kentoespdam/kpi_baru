import {
	EAuditStatus,
	IApiResponse,
	IAudit,
	IBaseId,
	IPageRequest,
	IPages,
	SelectType,
} from "./ICommons";
import { IGrade, isGrade } from "./IGrade";
import { IOrganization } from "./IOrganization";
import { IPosition } from "./IPosition";
import { IProfesi, isProfesi } from "./IProfesi";

export const LOCAL_KPI = "/api/master/kpi";
export const REMOTE_KPI = `${process.env.NEXT_API}/master/kpi`;

export interface IKpi extends IBaseId {
	organization: IOrganization;
	organizationId: number;
	position: IPosition;
	positionId: number;
	profesi: IProfesi;
	name: string;
	grade: IGrade;
}

export const isKpi = (obj: any): obj is IKpi => {
	return (
		typeof obj === "object" &&
		typeof obj.id === "number" &&
		typeof obj.organizationId === "number" &&
		typeof obj.positionId === "number" &&
		isProfesi(obj.profesi) &&
		typeof obj.name === "string" &&
		isGrade(obj.grade)
	);
};


export const kpiFilterType: SelectType[] = [
	{ id: "name", label: "KPI Name", type: "string" },
	{ id: "organization", label: "Organization", type: "organization" },
	{ id: "position", label: "Position", type: "position" },
	{ id: "profesi", label: "Profesi", type: "profesi" },
	{ id: "grade", label: "Grade", type: "grade" },
	{ id: "status", label: "Status", type: "eAuditStatus" },
];

export interface IKpiWithAudit extends IKpi, IAudit {}

export interface IKpiForm {
	id?: number;
	organization?: IOrganization | null;
	organizationId?: number;
	position?: IPosition | null;
	positionId?: number;
	profesi?: IProfesi | null;
	profesiId?: number;
	name?: string;
	grade?: IGrade | null;
	gradeId?: number;
	status?: EAuditStatus;
}

export interface IKpiRequest {
	id?: number;
	organization?: IOrganization;
	organizationId?: number;
	position?: IPosition;
	positionId?: number;
	profesi?: IProfesi;
	profesiId?: number;
	name?: string;
	grade?: IGrade;
	gradeId?: number;
	status?: EAuditStatus;
}

export interface IPageKpiRequest extends IPageRequest, IKpiRequest {}

export interface IKpiResponse extends IApiResponse<IKpiWithAudit[]> {}

export interface IPageKpiResponse extends IApiResponse<IPages<IKpiWithAudit>> {}
