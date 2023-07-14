import { MyTableHead } from "@myTypes/table";
import { ApiResponse, Audit, AuditStatus, BaseId, Pages } from "..";
import { Level } from "./level";

export const LOCAL_GRADE = "/api/master/grade";
export const REMOTE_GRADE = `${process.env.KPI_API}/master/grade`;

export interface Grade extends BaseId {
	grade: number;
	tukin: number;
	level: Level;
}

export interface GradeData {
	id?: number;
	grade: number;
	tukin: number;
	level: Level;
	status: AuditStatus;
}

export const isGrade = (obj: any): obj is Grade => {
	return obj.grade && obj.tukin && obj.level;
};

export interface GradeWithAudit extends Grade, Audit {}

export interface GradeWithPagination extends Pages<GradeWithAudit> {}

export interface GradeResponse extends ApiResponse<Grade[]> {}

export interface GradePageResponse extends ApiResponse<GradeWithPagination> {}

export const gradeHeader: MyTableHead[] = [
	{ field: null, title: "No", searchable: "false", width: 80 },
	{
		field: "grade",
		title: "Grade",
		searchable: "true",
		sortable: "true",
		type: "text",
	},
	{ field: "tukin", title: "Tukin", searchable: "false", sortable: "false" },
	{
		field: "level",
		title: "Level",
		searchable: "true",
		sortable: "true",
		type: "level",
	},
	{
		field: "status",
		title: "Status",
		searchable: "true",
		type: "auditStatus",
	},
	{ field: null, title: "Action", searchable: "false", width: 100 },
];
