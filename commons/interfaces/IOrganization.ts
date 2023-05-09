import { IApiResponse, IBaseId, SelectType } from "./ICommons";

export const LOCAL_ORGANIZATION = "/api/eo/organization";
export const REMOTE_ORGANIZATION = `${process.env.EO_API}/organization`;

export interface IOrganization extends IBaseId {
	name: string;
	code: string;
	level: number;
	parent: number;
	group: string;
	category: string;
}

export const isOrganization = (obj: any): obj is IOrganization => {
	return (
		typeof obj === "object" &&
		typeof obj.id === "number" &&
		typeof obj.name === "string" &&
		typeof obj.code === "string" &&
		typeof obj.level === "number" &&
		typeof obj.parent === "number" &&
		typeof obj.group === "string" &&
		typeof obj.category === "string"
	);
};

export const organizationFilterType: SelectType[] = [
	{ id: "name", label: "Organization", type: "string" },
	{ id: "code", label: "Code", type: "string" },
	{ id: "level", label: "Level", type: "number" },
	{ id: "parent", label: "Parent", type: "number" },
	{ id: "group", label: "Group", type: "string" },
	{ id: "category", label: "Category", type: "string" },
];

export interface IOrganizationRequest {
	id?: number;
	name?: string;
	code?: string;
	level?: number;
	parent?: number;
	group?: string;
	category?: string;
}

export interface IOrganizationSingleResponse
	extends IApiResponse<IOrganization> {}

export interface IOrganizationResponse extends IApiResponse<IOrganization[]> {}
