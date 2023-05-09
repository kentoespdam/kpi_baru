import { objectToQueryString } from "@helpers/fetch.helper";
import {
	deleteHelper,
	getHelper,
	postHelper,
	putHelper,
} from "@helpers/useAsync";
import { ESeverity } from "@interfaces/EStatus";
import {
	IIndikatorForm,
	IPageIndikatorRequest,
	IPageIndikatorResponse,
	LOCAL_INDIKATOR,
} from "@interfaces/IIndikator";
import { IFormStore, IPageRequestStore, IPagesStore } from "@interfaces/store";
import { create } from "zustand";

interface IndikatorStore
	extends IFormStore<IIndikatorForm>,
		IPageRequestStore<IPageIndikatorRequest>,
		IPagesStore<IPageIndikatorResponse> {}

export const useIndikatorStore = create<IndikatorStore>((set) => ({
	curPage: 0,
	setCurPage: (value) => set((state) => ({ ...state, curPage: value })),
	setForm: (value) => set((state) => ({ ...state, form: value })),
	action: "create",
	setAction: (value) => set((state) => ({ ...state, action: value })),
	pageRequest: {
		page: 0,
		size: 10,
	},
	setPageRequest: (value) =>
		set((state) => ({ ...state, pageRequest: value })),
	setPages: async (value?) => set((state) => ({ ...state, pages: value })),
}));

export const fetchIndikatorTable = async (
	pageRequest: IPageIndikatorRequest,
	setPages: (v?: IPageIndikatorResponse) => void
) => {
	try {
		const search = objectToQueryString(pageRequest);

		const result = await getHelper(`${LOCAL_INDIKATOR}${search}`);
		setPages(result);
	} catch (error) {
		console.log("error", error);
		setPages();
	}
};

export async function handleSave(
	openNotif: (v: string, s: ESeverity) => void,
	toggleDialog: () => void,
	form: IIndikatorForm,
	pageRequest: IPageIndikatorRequest,
	setPages: (v?: IPageIndikatorResponse) => void,
	action: "create" | "update"
) {
	try {
		form.kpiId = form.kpi?.id;
		delete form.kpi;

		const save =
			action === "create"
				? await postHelper(LOCAL_INDIKATOR, form)
				: await putHelper(LOCAL_INDIKATOR, form);
		openNotif(save.message, ESeverity.SUCCESS);

		fetchIndikatorTable(pageRequest, setPages);
		toggleDialog();
	} catch (error) {
		const err = error as Error;
		openNotif(err.message, ESeverity.ERROR);
	}
}

type handleDeleteProps = {
	url: string;
	openNotif: (v: string, s: ESeverity) => void;
	setPages: (v?: IPageIndikatorResponse) => void;
	pageRequest: IPageIndikatorRequest;
};

export async function handleDelete(props: handleDeleteProps) {
	const { url, openNotif, setPages, pageRequest } = props;
	try {
		const hapus = await deleteHelper(url);
		const severity =
			hapus.code === 200 ? ESeverity.SUCCESS : ESeverity.ERROR;

		openNotif(hapus.message, severity);
		fetchIndikatorTable(pageRequest, setPages);
	} catch (error) {
		const err = error as Error;
		openNotif(err.message, ESeverity.ERROR);
	}
}
