import { ApiResponse, BaseId } from "..";

export const LOCAL_ORGANIZATION = "/api/eo/organization";
export const REMOTE_ORGANIZATION = `${process.env.EO_API}/organization`;

export interface Organization extends BaseId {
	name: string;
	code: string;
	level: number;
	parent: number;
	group: string;
	category: string;
}

export interface OrganizationSingleResponse extends ApiResponse<Organization> {}

export interface OrganizationResponse extends ApiResponse<Organization[]> {}
