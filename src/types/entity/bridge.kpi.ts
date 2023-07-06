import { ApiResponse, Audit, BaseId, Pages } from "..";
import { Employee } from "./employee";
import { Kpi } from "./kpi";
import { Level } from "./level";
import { Organization } from "./organization";
import { Position } from "./position";

export const LOCAL_BRIDGE_KPI = "/api/bridge/kpi";
export const REMOTE_BRIDGE_KPI = `${process.env.KPI_API}/bridge/pegawai-kpi`;

export interface BridgeKpi extends BaseId {
	employee?: Employee;
	nipam: string;
	name: string;
	organization?: Organization;
	organizationId: number;
	position?: Position;
	positionId: number;
	level: Level;
	kpi: Kpi;
}

export interface BridgeKpiWithAudit extends BridgeKpi, Audit {}

export interface BridgeKpiWithPagination extends Pages<BridgeKpiWithAudit> {}

export interface BridgeKpiResponse extends ApiResponse<BridgeKpi[]> {}

export interface BridgeKpiPageResponse
	extends ApiResponse<BridgeKpiWithPagination> {}
