import { Periode, getCurrentPeriode } from "@helper/periode";
import { BridgeKpiWithAudit } from "@myTypes/entity/bridge.kpi";
import { create } from "zustand";

export interface TransKpiStore {
	periode: Periode | null;
	setPeriode: (periode: Periode | null) => void;
	bridgeKpi: BridgeKpiWithAudit | null;
	setBridgeKpi: (bridgeKpi: BridgeKpiWithAudit | null) => void;
}

export const useTransKpiStore = create<TransKpiStore>((set) => ({
	periode: getCurrentPeriode(-1),
	setPeriode: (periode) => set(() => ({ periode })),
	bridgeKpi: null,
	setBridgeKpi: (bridgeKpi) =>
		set(() => ({ bridgeKpi: bridgeKpi })),
}));
