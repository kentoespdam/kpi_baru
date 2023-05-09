import { objectToQueryString } from "@helpers/fetch.helper";
import {
	deleteHelper,
	getHelper,
	postHelper,
	putHelper,
} from "@helpers/useAsync";
import { ESeverity } from "@interfaces/EStatus";
import {
	IPerilakuForm,
	IPagePerilakuRequest,
	IPagePerilakuResponse,
	LOCAL_PERILAKU,
} from "@interfaces/IPerilaku";
import { IFormStore, IPageRequestStore, IPagesStore } from "@interfaces/store";
import { create } from "zustand";

interface IPerilakuStore
	extends IFormStore<IPerilakuForm>,
		IPageRequestStore<IPagePerilakuRequest>,
		IPagesStore<IPagePerilakuResponse> {}

export const usePerilakuStore = create<IPerilakuStore>((set) => ({
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

export const fetchPerilakuTable = async (
	pageRequest: IPagePerilakuRequest,
	setPages: (v?: IPagePerilakuResponse) => void
) => {
	try {
		const search = objectToQueryString(pageRequest);

		const result = await getHelper(`${LOCAL_PERILAKU}${search}`);
		setPages(result);
	} catch (error) {
		console.log("error", error);
		setPages();
	}
};

export async function handleSave(
	openNotif: (v: string, s: ESeverity) => void,
	toggleDialog: () => void,
	form: IPerilakuForm,
	pageRequest: IPagePerilakuRequest,
	setPages: (v?: IPagePerilakuResponse) => void,
	action: "create" | "update"
) {
	try {
		const save =
			action === "create"
				? await postHelper(LOCAL_PERILAKU, form)
				: await putHelper(LOCAL_PERILAKU, form);
		openNotif(save.message, ESeverity.SUCCESS);
		fetchPerilakuTable(pageRequest, setPages);
		toggleDialog();
	} catch (error) {
		const err = error as Error;
		openNotif(err.message, ESeverity.ERROR);
	}
}

type handleDeleteProps = {
	url: string;
	openNotif: (v: string, s: ESeverity) => void;
	setPages: (v?: IPagePerilakuResponse) => void;
	pageRequest: IPagePerilakuRequest;
};

export async function handleDelete(props: handleDeleteProps) {
	const { url, openNotif, setPages, pageRequest } = props;
	try {
		const hapus = await deleteHelper(url);
		const severity =
			hapus.code === 200 ? ESeverity.SUCCESS : ESeverity.ERROR;
		openNotif(hapus.message, severity);
		fetchPerilakuTable(pageRequest, setPages);
	} catch (error) {
		const err = error as Error;
		openNotif(err.message, ESeverity.ERROR);
	}
}
