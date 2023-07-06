import { ApiResponse, Audit, BaseId, Pages } from "..";
import { Level } from "./level";

export const LOCAL_GRADE = "/api/master/grade";
export const REMOTE_GRADE = `${process.env.KPI_API}/master/grade`;

export interface Grade extends BaseId {
	grade: number;
	tukin: number;
	level: Level;
}

export const isGrade = (obj: any): obj is Grade => {
	return obj.grade && obj.tukin && obj.level;
};

export interface GradeWithAudit extends Grade, Audit {}

export interface GradeWithPagination extends Pages<GradeWithAudit> {}

export interface GradeResponse extends ApiResponse<Grade[]> {}

export interface GradePageResponse extends ApiResponse<GradeWithPagination> {}
