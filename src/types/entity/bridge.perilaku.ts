import { ApiResponse, Audit, BaseId, Pages } from "..";
import { Level } from "./level";
import { Perilaku } from "./perilaku";

export const LOCAL_BRIDGE_PERILAKU = "/api/bridge/perilaku";
export const REMOTE_BRIDGE_PERILAKU = `${process.env.KPI_API}/bridge/level-perilaku`;

export interface BridgePerilaku extends BaseId {
	perilaku: Perilaku;
	level?: Level;
}

export interface BridgePerilakuWithAudit extends BridgePerilaku, Audit{}

export interface BridgePerilakuWithPagination extends Pages<BridgePerilakuWithAudit>{}

export interface BridgePerilakuResponse extends ApiResponse<BridgePerilaku[]>{}

export interface BridgePerilakuPageResponse extends ApiResponse<BridgePerilakuWithPagination>{}