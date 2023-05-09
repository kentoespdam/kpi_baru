import { ITransKpiPegawai } from "@interfaces/ITransKpiPegawai";
import { create } from "zustand";

interface KpiStaffStore {
	transKpiPegawai?: ITransKpiPegawai;
	setTransKpiPegawai: (transKpiPegawai?: ITransKpiPegawai) => void;
	nilaiTotal: number;
	setNilaiTotal: (nilaiTotal: number) => void;
}

export const useKpiStaffStore = create<KpiStaffStore>((set) => ({
	setTransKpiPegawai: (value?) =>
		set((state) => ({ ...state, transKpiPegawai: value })),
	nilaiTotal: 0,
	setNilaiTotal: (value) => set((state) => ({ ...state, nilaiTotal: value })),
}));
