import { Periode, getCurrentPeriode } from "@helper/periode";
import { BridgeKpi } from "@myTypes/entity/bridge.kpi";
import { create } from "zustand";

interface KpiAdminStore {
	isOrgOpen: boolean;
	setOrgOpen: (v: boolean) => void;
	periode: Periode | null;
	setPeriode: (v: Periode | null) => void;
	rootNipam: string | null;
	setRootNipam: (v: string | null) => void;
	bridgeKpiList: BridgeKpi[];
	setBridgeKpiList: (v: BridgeKpi[]) => void;
	bridgeKpi: BridgeKpi | null;
	setBridgeKpi: (v: BridgeKpi | null) => void;
}

export const useKpiAdminStore = create<KpiAdminStore>((set) => ({
	isOrgOpen: false,
	setOrgOpen: (v) => set({ isOrgOpen: v }),
	periode: getCurrentPeriode(-1),
	setPeriode: (periode) => set({ periode }),
	rootNipam: null,
	setRootNipam: (value) => set({ rootNipam: value }),
	bridgeKpiList: [],
	setBridgeKpiList: (value) => set({ bridgeKpiList: value }),
	bridgeKpi: null,
	setBridgeKpi: (value) => set({ bridgeKpi: value }),
}));
