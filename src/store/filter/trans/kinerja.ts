import { BridgeKpiWithAudit } from "@myTypes/entity/bridge.kpi";
import { AccordionStore } from "@store/main/accordion";
import { create } from "zustand";

interface TransKinerjaStore extends AccordionStore {
	nipamStaff: string | null;
	setNipamStaff: (nipamStaff: string | null) => void;
	bridgeKpiBawahan: BridgeKpiWithAudit | null;
	setBridgeKpiBawahan: (bridgeKpi: BridgeKpiWithAudit | null) => void;
}

export const useTransKinerjaStore = create<TransKinerjaStore>((set) => ({
	expanded: false,
	setExpanded: (expanded) => set({ expanded }),
	nipamStaff: null,
	setNipamStaff: (nipamStaff) => set(() => ({ nipamStaff })),
	bridgeKpiBawahan: null,
	setBridgeKpiBawahan: (bridgeKpi) =>
		set(() => ({ bridgeKpiBawahan: bridgeKpi })),
}));
