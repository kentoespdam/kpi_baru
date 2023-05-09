import { putHelper } from "@helpers/useAsync";
import { ESeverity } from "@interfaces/EStatus";
import {
	ITransPerilakuNilai,
	ITransPerilakuNilaiPost,
	LOCAL_TRANS_PERILAKU_NILAI,
} from "@interfaces/ITransPerilakuNilai";
import { create } from "zustand";

interface TransPerilakuStore {
	perilaku?: ITransPerilakuNilai;
	setPerilaku: (perilaku?: ITransPerilakuNilai) => void;
}

export const useTransPerilakuStore = create<TransPerilakuStore>((set) => ({
	setPerilaku: (perilaku?: ITransPerilakuNilai) =>
		set((state) => ({ ...state, perilaku: perilaku })),
}));

export async function updateNilaiHandler(
	openNotif: (v: string, s: ESeverity) => void,
	toggleDialog: () => void,
	form: ITransPerilakuNilaiPost
) {
	try {
		const update = await putHelper(LOCAL_TRANS_PERILAKU_NILAI, form);
		openNotif(update.message, ESeverity.SUCCESS);
		toggleDialog();
		return update;
	} catch (error) {
		const err = error as Error;
		openNotif(err.message, ESeverity.ERROR);
		return null;
	}
}
