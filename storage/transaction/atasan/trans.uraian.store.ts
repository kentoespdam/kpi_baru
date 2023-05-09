import { putHelper } from "@helpers/useAsync";
import { ESeverity } from "@interfaces/EStatus";
import {
	IKpiUraian,
	IKpiUraianPost,
	LOCAL_TRANS_KPI_URAIAN,
} from "@interfaces/ITransKpiPegawai";
import { create } from "zustand";

interface TransUraianStore {
	uraian?: IKpiUraian;
	setUraian: (uraian?: IKpiUraian) => void;
}

export const useTransUraianStore = create<TransUraianStore>((set) => ({
	setUraian: (uraian?: IKpiUraian) =>
		set((state) => ({ ...state, uraian: uraian })),
}));

export async function updateTransUraianHandler(
	openNotif: (v: string, s: ESeverity) => void,
	toggleDialog: () => void,
	form: IKpiUraianPost
) {
	try {
		const update = await putHelper(LOCAL_TRANS_KPI_URAIAN, form);
		openNotif(update.message, ESeverity.SUCCESS);
		toggleDialog();
		return update;
	} catch (error) {
		const err = error as Error;
		openNotif(err.message, ESeverity.ERROR);
		return null;
	}
}
