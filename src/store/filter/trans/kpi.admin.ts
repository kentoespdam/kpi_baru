import { Periode, getCurrentPeriode } from "@helper/periode";
import { BridgeKpi } from "@myTypes/entity/bridge.kpi";
import { create } from "zustand";

interface KpiAdminStore {
	periode: Periode | null;
	setPeriode: (v: Periode | null) => void;
	bridgeKpi: BridgeKpi | null;
	setBridgeKpi: (v: BridgeKpi | null) => void;
}

export const useKpiAdminStore = create<KpiAdminStore>((set) => ({
	periode: getCurrentPeriode(-1),
	setPeriode: (periode) => set({ periode }),
	bridgeKpi: null,
	setBridgeKpi: (value) => set({ bridgeKpi: value }),
}));
