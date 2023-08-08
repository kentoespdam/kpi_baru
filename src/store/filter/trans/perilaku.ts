import { BridgePerilakuWithAudit } from "@myTypes/entity/bridge.perilaku";
import { AccordionStore } from "@store/main/accordion";
import { create } from "zustand";

interface TransPerilakuStore extends AccordionStore {
	levelStaff: number | null;
	setLevelStaff: (levelStaff: number | null) => void;
	bridgePerilakuBawahan: BridgePerilakuWithAudit | null;
	setBridgePerilakuBawahan: (
		bridgePerilaku: BridgePerilakuWithAudit | null
	) => void;
}

export const useTransPerilakuStore = create<TransPerilakuStore>((set) => ({
	expanded: false,
	setExpanded: (expanded) => set({ expanded }),
	levelStaff: null,
	setLevelStaff: (levelStaff) => set(() => ({ levelStaff })),
	bridgePerilakuBawahan: null,
	setBridgePerilakuBawahan: (bridgePerilaku) =>
		set(() => ({ bridgePerilakuBawahan: bridgePerilaku })),
}));
