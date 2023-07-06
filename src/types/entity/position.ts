import { ApiResponse } from "..";

export const LOCAL_POSITION = "/api/eo/position";
export const REMOTE_POSITION = `${process.env.EO_API}/positions`;

export interface Position {
	name: string;
	code: string;
	level: number;
	parent: number;
	golongan: string;
}

export interface PositionSingleResponse extends ApiResponse<Position> {}

export interface PositionListResponse extends ApiResponse<Position[]> {}
