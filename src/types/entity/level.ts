import { ApiResponse, Audit, BaseId, Pages } from "..";

export const LOCAL_LEVEL = "/api/master/level";
export const REMOTE_LEVEL = `${process.env.KPI_API}/master/level`;

export interface Level extends BaseId {
	level: string;
}

export const isLevel = (obj: any): obj is Level => {
	return obj && obj.level;
};

export interface LevelWithAudit extends Level, Audit {}

export interface LevelWithPagination extends Pages<LevelWithAudit> {}

export interface LevelResponse extends ApiResponse<Level[]> {}

export interface LevelPageResponse extends ApiResponse<LevelWithPagination> {}
