import {
	EAuditStatus,
	IApiResponse,
	IAudit,
	IBaseId,
	IPageRequest,
	IPages,
	SelectType,
} from "./ICommons";
import { ILevel, isLevel } from "./ILevel";

export const LOCAL_GRADE = "/api/master/grade";
export const REMOTE_GRADE = `${process.env.NEXT_API}/master/grade`;

export interface IGrade extends IBaseId {
	grade: number;
	tukin: number;
	level: ILevel;
}

export const isGrade = (obj: any): obj is IGrade => {
	return (
		typeof obj === "object" &&
		typeof obj.id === "number" &&
		typeof obj.grade === "number" &&
		typeof obj.tukin === "number" &&
		isLevel(obj.level)
	);
};

export const gradeFilterType: SelectType[] = [
	{ id: "grade", label: "Grade", type: "string" },
	// { id: "level", label: "Level", type: "level" },
	{ id: "status", label: "Status", type: "eAuditStatus" },
];

export interface IGradeWithAudit extends IGrade, IAudit {}

export interface IGradeForm {
	id?: number;
	grade?: number;
	tukin?: number;
	level?: ILevel | null;
	levelId?: number;
	status?: EAuditStatus;
}

export interface IGradeRequest {
	id?: number;
	grade?: number;
	tukin?: number;
	// level?: ILevel;
	// levelId?: number;
}

export interface IPageGradeRequest extends IPageRequest, IGradeRequest {}

export interface IGradeResponse extends IApiResponse<IGradeWithAudit[]> {}

export interface IPageGradeResponse
	extends IApiResponse<IPages<IGradeWithAudit>> {}
