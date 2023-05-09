import {
	EAuditStatus,
	IApiResponse,
	IAudit,
	IBaseId,
	IPageRequest,
	IPages,
	SelectType
} from "./ICommons";
import { ILevel } from "./ILevel";

export const LOCAL_PROFESI = "/api/master/profesi";
export const REMOTE_PROFESI = `${process.env.NEXT_API}/master/profesi`;

export interface IProfesi extends IBaseId {
	name: string;
	level: ILevel;
}

export const profesiFilterType: SelectType[] = [
	{ id: "name", label: "Profesi", type: "string" },
	{ id: "level", label: "Level", type: "level" },
	{ id: "status", label: "Status", type: "eAuditStatus" },
];

export interface IProfesiWithAudit extends IProfesi, IAudit {}

export const isProfesi = (obj: any): obj is IProfesi => {
	return (
		typeof obj === "object" &&
		typeof obj.id === "number" &&
		typeof obj.name === "string" &&
		typeof obj.level === "object"
	);
};

export interface IProfesiForm {
	id?: number;
	name?: string;
	level?: ILevel | null;
	levelId?: number;
	status?: EAuditStatus;
}

export interface IProfesiRequest {
	id?: number;
	name?: string;
	level?: ILevel;
	levelId?: number;
	status?: EAuditStatus;
}

export interface IPageProfesiRequest extends IPageRequest, IProfesiRequest {}

export interface IProfesiResponse extends IApiResponse<IProfesiWithAudit[]> {}

export interface IPageProfesiResponse
	extends IApiResponse<IPages<IProfesiWithAudit>> {}
