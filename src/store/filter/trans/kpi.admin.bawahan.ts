import { AccordionStore } from "@store/main/accordion";
import { create } from "zustand";

export const useKpiAdminBawahanStore = create<AccordionStore>((set) => ({
	expanded: false,
	setExpanded: (expanded) => set({ expanded }),
}));
