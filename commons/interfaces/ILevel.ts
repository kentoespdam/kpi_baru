import {
	EAuditStatus,
	IApiResponse,
	IAudit,
	IBaseId,
	IPageRequest,
	IPages,
	SelectType,
} from "./ICommons";

export const LOCAL_LEVEL = "/api/master/level";
export const REMOTE_LEVEL = `${process.env.NEXT_API}/master/level`;

export interface ILevel extends IBaseId {
	level: string;
}

export const isLevel = (obj: any): obj is ILevel => {
	return (
		typeof obj === "object" &&
		typeof obj.id === "number" &&
		typeof obj.level === "string"
	);
};

export const levelFilterType: SelectType[] = [
	{ id: "level", label: "Level", type: "string" },
	{ id: "status", label: "Status", type: "eAuditStatus" },
];

export interface ILevelWithAudit extends ILevel, IAudit {}

//check typeof object is ILevelWithAudit
export const isILevelWithAudit = (obj: any): obj is ILevelWithAudit => {
	return (
		typeof obj === "object" &&
		typeof obj.id === "number" &&
		typeof obj.level === "string" &&
		typeof obj.status === "string"
	);
};

export interface ILevelForm {
	id?: number;
	level?: string;
	status?: EAuditStatus;
}

export interface ILevelRequest {
	id?: number;
	level?: string;
}

export interface IPageLevelRequest extends IPageRequest, ILevelRequest {}

export interface ILevelResponse extends IApiResponse<ILevelWithAudit[]> {}

export interface IPageLevelResponse
	extends IApiResponse<IPages<ILevelWithAudit>> {}
