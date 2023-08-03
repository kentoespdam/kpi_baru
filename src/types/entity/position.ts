import { ApiResponse, BaseId } from "..";
import { Organization } from "./organization";

export const LOCAL_POSITION = "/api/eo/position";
export const REMOTE_POSITION = `${process.env.EO_API}/positions`;

export interface Position extends BaseId {
	name: string;
	code: string;
	level: number;
	parent: number;
	golongan: string;
	organization: Organization;
}

export interface PositionSingleResponse extends ApiResponse<Position> {}

export interface PositionListResponse extends ApiResponse<Position[]> {}
