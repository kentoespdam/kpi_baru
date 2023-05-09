import {
	EAuditStatus,
	IApiResponse,
	IBaseId,
	IPageRequest,
	IPages,
	SelectType,
} from "./ICommons";
import { ILevel, isLevel } from "./ILevel";
import { IPerilaku, isPerilaku } from "./IPerilaku";

export const LOCAL_BRIDGE_LEVEL_PERILAKU = "/api/bridge/level-perilaku";
export const REMOTE_BRIDGE_LEVEL_PERILAKU = `${process.env.NEXT_API}/bridge/level-perilaku`;

export interface IBridgeLevelPerilaku extends IBaseId {
	perilaku: IPerilaku;
	level?: ILevel;
}

export const isBridgeLevelPerilaku = (
	obj: any
): obj is IBridgeLevelPerilaku => {
	return (
		typeof obj === "object" &&
		typeof obj.id === "number" &&
		isPerilaku(obj.perilaku) &&
		isLevel(obj.level)
	);
};

export const bridgeLevelPerilakuFilterType: SelectType[] = [
	{ id: "perilaku", label: "Perilaku", type: "perilaku" },
	{ id: "level", label: "Level", type: "level" },
];

export interface IBridgeLevelPerilakuWithAudit extends IBridgeLevelPerilaku {}

export interface IBridgeLevelPerilakuForm {
	id?: number;
	perilaku?: IPerilaku | null;
	perilakuId?: number;
	level?: ILevel | null;
	levelId?: number;
	status?: EAuditStatus;
}

export interface IBridgeLevelPerilakuRequest {
	id?: number;
	perilaku?: IPerilaku | null;
	perilakuId?: number;
	level?: ILevel | null;
	levelId?: number;
	status?: EAuditStatus;
}

export interface IPageBridgeLevelPerilakuRequest
	extends IPageRequest,
		IBridgeLevelPerilakuRequest {}

export interface IBridgeLevelPerilakuResponse
	extends IApiResponse<IBridgeLevelPerilakuWithAudit[]> {}

export interface IPageBridgeLevelPerilakuResponse
	extends IApiResponse<IPages<IBridgeLevelPerilakuWithAudit>> {}
