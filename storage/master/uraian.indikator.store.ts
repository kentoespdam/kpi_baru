import { objectToQueryString } from "@helpers/fetch.helper";
import {
	deleteHelper,
	getHelper,
	postHelper,
	putHelper,
} from "@helpers/useAsync";
import { ESeverity } from "@interfaces/EStatus";
import {
	IUraianIndikatorForm,
	IPageUraianIndikatorRequest,
	IPageUraianIndikatorResponse,
	LOCAL_URAIAN_INDIKATOR,
} from "@interfaces/IUraianIndikator";
import { IFormStore, IPageRequestStore, IPagesStore } from "@interfaces/store";
import { create } from "zustand";

interface IUraianIndikatorStore
	extends IFormStore<IUraianIndikatorForm>,
		IPageRequestStore<IPageUraianIndikatorRequest>,
		IPagesStore<IPageUraianIndikatorResponse> {}

export const useUraianIndikatorStore = create<IUraianIndikatorStore>((set) => ({
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

export const fetchUraianIndikatorTable = async (
	pageRequest: IPageUraianIndikatorRequest,
	setPages: (v?: IPageUraianIndikatorResponse) => void
) => {
	try {
		const search = objectToQueryString(pageRequest);

		const result = await getHelper(`${LOCAL_URAIAN_INDIKATOR}${search}`);
		setPages(result);
	} catch (error) {
		console.log("error", error);
		setPages();
	}
};

export async function handleSave(
	openNotif: (v: string, s: ESeverity) => void,
	toggleDialog: () => void,
	form: IUraianIndikatorForm,
	setPages: (v?: IPageUraianIndikatorResponse) => void,
	pageRequest: IPageUraianIndikatorRequest,
	action: "create" | "update"
) {
	try {
		form.indikatorId = form.indikator?.id;
		delete form.indikator;
		delete form.kpi;
		const result =
			action === "create"
				? await postHelper(LOCAL_URAIAN_INDIKATOR, form)
				: await putHelper(LOCAL_URAIAN_INDIKATOR, form);
		openNotif(result.message, ESeverity.SUCCESS);
		fetchUraianIndikatorTable(pageRequest, setPages);
		toggleDialog();
	} catch (error) {
		const err = error as Error;
		openNotif(err.message, ESeverity.ERROR);
	}
}

type handleDeleteProps = {
	url: string;
	openNotif: (v: string, s: ESeverity) => void;
	setPages: (v?: IPageUraianIndikatorResponse) => void;
	pageRequest: IPageUraianIndikatorRequest;
};

export async function handleDelete(props: handleDeleteProps) {
	const { url, openNotif, setPages, pageRequest } = props;
	try {
		const hapus = await deleteHelper(url);
		const severity =
			hapus.code === 200 ? ESeverity.SUCCESS : ESeverity.ERROR;
		openNotif(hapus.message, severity);
		fetchUraianIndikatorTable(pageRequest, setPages);
	} catch (error) {
		const err = error as Error;
		openNotif(err.message, ESeverity.ERROR);
	}
}
