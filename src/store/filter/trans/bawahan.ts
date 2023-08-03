import { BridgeKpiWithAudit } from "@myTypes/entity/bridge.kpi";
import { create } from "zustand";
import { AccordionStore } from "../master/kpi";

interface TransKpiBawahanStore extends AccordionStore {
	nipamStaff: string | null;
	setNipamStaff: (nipamStaff: string | null) => void;
	bridgeKpiBawahan: BridgeKpiWithAudit | null;
	setBridgeKpiBawahan: (bridgeKpi: BridgeKpiWithAudit | null) => void;
}

export const useTransKpiBawahanStore = create<TransKpiBawahanStore>((set) => ({
	expanded: false,
	setExpanded: (expanded) => set({ expanded }),
	nipamStaff: null,
	setNipamStaff: (nipamStaff) => set(() => ({ nipamStaff })),
	bridgeKpiBawahan: null,
	setBridgeKpiBawahan: (bridgeKpi) => set(() => ({ bridgeKpiBawahan: bridgeKpi })),
}));
