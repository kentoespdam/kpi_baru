import { getHelper } from "@helpers/useAsync";
import { IBridgeKpiPegawai } from "@interfaces/IBridgeKpiPegawai";
import { IEmployee } from "@interfaces/IEmployee";
import {
	ITransKpiPegawai,
	LOCAL_TRANS_KPI_PEGAWAI
} from "@interfaces/ITransKpiPegawai";
import { getEmployeeByPosition } from "@utils/get.employee";
import { create } from "zustand";

interface TransactionKpiStore {
	employee?: IEmployee;
	setEmployee: (employee?: IEmployee) => void;
	atasan?: IEmployee;
	setAtasan: (atasan?: IEmployee) => void;
	bridgeKpi?: IBridgeKpiPegawai;
	setBridgeKpi: (bridgeKpi?: IBridgeKpiPegawai) => void;
	periode?: string;
	setPeriode: (periode?: string) => void;
	transKpiPegawai?: ITransKpiPegawai;
	setTransKpiPegawai: (transKpiPegawai?: ITransKpiPegawai) => void;
}

export const useTransactionKpiStore = create<TransactionKpiStore>((set) => ({
	setEmployee: (employee?: IEmployee) =>
		set((state) => ({ ...state, employee })),
	setAtasan: (atasan?: IEmployee) => set((state) => ({ ...state, atasan })),
	setBridgeKpi: (bridgeKpi?: IBridgeKpiPegawai) =>
		set((state) => ({ ...state, bridgeKpi: bridgeKpi })),
	setPeriode: (periode?: string) => set((state) => ({ ...state, periode })),
	setTransKpiPegawai: (transKpiPegawai?: ITransKpiPegawai) =>
		set((state) => ({ ...state, transKpiPegawai })),
}));

export async function getEmployee(
	employee: IEmployee,
	setEmployee: (employee: IEmployee) => void,
	setAtasan: (atasan: IEmployee) => void
) {
	setEmployee(employee);
	const atasan = await getEmployeeByPosition(
		Number(employee?.position.parent)
	);
	setAtasan(atasan.data);
}

export async function getKpiPegawai(
	setTransKpiPegawai: (transKpiPegawai?: ITransKpiPegawai) => void,
	periode?: string,
	nipam?: string,
	kpiId?: number
) {
	if (!periode) return;
	const search = new URLSearchParams();
	search.append("periode", periode);
	search.append("nipam", String(nipam));
	search.append("kpiId", String(kpiId));

	try {
		const transKpi = await getHelper(
			`${LOCAL_TRANS_KPI_PEGAWAI}?${search.toString()}`
		);
		setTransKpiPegawai(transKpi.data);
	} catch (e) {
		console.log(e);
		setTransKpiPegawai();
	}
}
