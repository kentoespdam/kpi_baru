import { IApiResponse, IBaseId, SelectType } from "./ICommons";
import { IOrganization, isOrganization } from "./IOrganization";

export const LOCAL_POSITION = "/api/eo/position";
export const REMOTE_POSITION = `${process.env.EO_API}/positions`;

export interface IPosition extends IBaseId {
	name: string;
	code: string;
	level: number;
	parent: number;
	golongan: string;
}

export const isPosition = (obj: any): obj is IPosition => {
	return (
		typeof obj === "object" &&
		typeof obj.id === "number" &&
		typeof obj.name === "string" &&
		typeof obj.code === "string" &&
		typeof obj.level === "number" &&
		typeof obj.parent === "number" &&
		typeof obj.golongan === "string" 
	);
};

export const positionFilterType: SelectType[] = [
	{ id: "name", label: "Position", type: "string" },
	{ id: "code", label: "Code", type: "string" },
	{ id: "level", label: "Level", type: "number" },
	{ id: "parent", label: "Parent", type: "number" },
	{ id: "golongan", label: "Golongan", type: "string" },
];

export interface IPositionRequest {
	id?: number;
	name?: string;
	code?: string;
	level?: number;
	parent?: number;
	golongan?: string;
}

export interface IPositionSingleResponse extends IApiResponse<IPosition> {}

export interface IPositionResponse extends IApiResponse<IPosition[]> {}
