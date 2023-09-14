import { DetEmployee } from "@myTypes/entity/det.employee";
import { TransKpi } from "@myTypes/entity/trans.kpi";
import { TransPerilaku } from "@myTypes/entity/trans.perilaku";
import { getBiodata } from "@utils/eo/server/biodata";
import { create } from "zustand";

interface CetakStore {
	nipam: string | null;
	periode: number | null;
	kpiId: number | null;
	levelId: number | null;
	biodata: DetEmployee | null;
	kpiData: TransKpi | null;
	perilakuData: TransPerilaku | null;
}

export const useCetakStore = create<CetakStore>((set, get) => ({
	nipam: null,
	periode: null,
	kpiId: null,
	levelId: null,
	biodata: null,
	kpiData: null,
	perilakuData: null,
}));
