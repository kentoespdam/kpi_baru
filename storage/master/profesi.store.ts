import { objectToQueryString } from "@commons/helpers/fetch.helper";
import {
	deleteHelper,
	getHelper,
	postHelper,
	putHelper,
} from "@commons/helpers/useAsync";
import { ESeverity } from "@commons/interfaces/EStatus";
import {
	IPageProfesiRequest,
	IPageProfesiResponse,
	IProfesiForm,
	LOCAL_PROFESI,
} from "@commons/interfaces/IProfesi";
import {
	IFormStore,
	IPageRequestStore,
	IPagesStore,
} from "@commons/interfaces/store";
import { create } from "zustand";

interface IProfesiStore
	extends IFormStore<IProfesiForm>,
		IPageRequestStore<IPageProfesiRequest>,
		IPagesStore<IPageProfesiResponse> {}

export const useProfesiStore = create<IProfesiStore>((set) => ({
	curPage: 0,
	setCurPage: (value) => {
		set((state) => ({ ...state, curPage: value }));
	},
	setForm: (value) => {
		set((state) => ({ ...state, form: value }));
	},
	action: "create",
	setAction: (value) => {
		set((state) => ({ ...state, action: value }));
	},
	pageRequest: {
		page: 0,
		size: 10,
		sort: "name",
		direction: "ASC",
	},
	setPageRequest: (value) => {
		set((state) => ({ ...state, pageRequest: value }));
	},
	setPages: async (value) => {
		set((state) => ({ ...state, pages: value }));
	},
}));

export const fetchProfesiTable = async (
	pageRequest: IPageProfesiRequest,
	setPages: (v: IPageProfesiResponse) => void
) => {
	try {
		const search = objectToQueryString(pageRequest);
		const result: IPageProfesiResponse = await getHelper(
			`${LOCAL_PROFESI}${search}`
		);
		setPages(result);
	} catch (error) {
		const err = error as Error;
		console.log(err.message);
	}
};

type handleDeleteProps = {
	url: string;
	openNotif: (message: string, severity: ESeverity) => void;
	pageRequest: Object;
	setPages: (v: any) => void;
};
export async function handleDelete(props: handleDeleteProps) {
	const { url, openNotif, pageRequest, setPages } = props;
	try {
		const hapus = await deleteHelper(url);
		const severity =
			hapus.code === 200 ? ESeverity.SUCCESS : ESeverity.ERROR;
		openNotif(hapus.message, severity);
		const search = objectToQueryString(pageRequest);
		const result: IPageProfesiResponse = await getHelper(
			`${LOCAL_PROFESI}${search}`
		);
		setPages(result);
	} catch (error) {
		const err = error as Error;
		openNotif(err.message, ESeverity.ERROR);
	}
}

export async function handleSaveProfesi(
	openNotif: (message: string, severity: ESeverity) => void,
	toggleDialog: () => void,
	form: IProfesiForm,
	pageRequest: IPageProfesiRequest,
	setPages: (v: IPageProfesiResponse) => void,
	action: "create" | "update"
) {
	try {
		form.levelId = form.level?.id;
		delete form.level;

		const save =
			action === "create"
				? await postHelper(LOCAL_PROFESI, form)
				: await putHelper(LOCAL_PROFESI, form);
		openNotif(save.message, ESeverity.SUCCESS);

		const search = objectToQueryString(pageRequest);
		const result: IPageProfesiResponse = await getHelper(
			`${LOCAL_PROFESI}${search}`
		);
		setPages(result);
		toggleDialog();
	} catch (error) {
		const err = error as Error;
		openNotif(err.message, ESeverity.ERROR);
	}
}
