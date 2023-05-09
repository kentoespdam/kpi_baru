import { objectToQueryString } from "@helpers/fetch.helper";
import {
	deleteHelper,
	getHelper,
	postHelper,
	putHelper,
} from "@helpers/useAsync";
import { ESeverity } from "@interfaces/EStatus";
import {
	IBridgeLevelPerilakuForm,
	IPageBridgeLevelPerilakuRequest,
	IPageBridgeLevelPerilakuResponse,
	LOCAL_BRIDGE_LEVEL_PERILAKU,
} from "@interfaces/IBridgeLevelPerilaku";
import { IFormStore, IPageRequestStore, IPagesStore } from "@interfaces/store";
import { create } from "zustand";

interface IBridgeLevelPerilakuStore
	extends IFormStore<IBridgeLevelPerilakuForm>,
		IPageRequestStore<IPageBridgeLevelPerilakuRequest>,
		IPagesStore<IPageBridgeLevelPerilakuResponse>,
		IPageRequestStore<IPageBridgeLevelPerilakuRequest>,
		IPagesStore<IPageBridgeLevelPerilakuResponse> {}

export const useBridgeLevelPerilakuStore = create<IBridgeLevelPerilakuStore>(
	(set) => ({
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
		setPages: async (value?) =>
			set((state) => ({ ...state, pages: value })),
	})
);

export const fetchBridgeLevelPerilakuTable = async (
	pageRequest: IPageBridgeLevelPerilakuRequest,
	setPages: (v?: IPageBridgeLevelPerilakuResponse) => void
) => {
	try {
		const search = objectToQueryString(pageRequest);

		const levelPerilaku = await getHelper(
			`${LOCAL_BRIDGE_LEVEL_PERILAKU}${search}`
		);

		setPages(levelPerilaku);
	} catch (error) {
		console.log(error);
		setPages();
	}
};

export async function handleSave(
	openNotif: (v: string, s: ESeverity) => void,
	toggleDialog: () => void,
	form: IBridgeLevelPerilakuForm,
	pageRequest: IPageBridgeLevelPerilakuRequest,
	setPages: (v?: IPageBridgeLevelPerilakuResponse) => void,
	action: "create" | "update"
) {
	try {
		const save =
			action === "create"
				? await postHelper(LOCAL_BRIDGE_LEVEL_PERILAKU, form)
				: await putHelper(LOCAL_BRIDGE_LEVEL_PERILAKU, form);
		const severity =
			save.code === 201 ? ESeverity.SUCCESS : ESeverity.ERROR;
		openNotif(save.message, severity);

		fetchBridgeLevelPerilakuTable(pageRequest, setPages);
		toggleDialog();
	} catch (error) {
		const err = error as Error;
		openNotif(err.message, ESeverity.ERROR);
	}
}

interface HandleDeleteProps<R, S> {
	url: string;
	openNotif: (v: string, s: ESeverity) => void;
	pageRequest: R;
	setPages: (v?: S) => void;
}
export async function handleDelete(
	props: HandleDeleteProps<
		IPageBridgeLevelPerilakuRequest,
		IPageBridgeLevelPerilakuResponse
	>
) {
	const { url, openNotif, pageRequest, setPages } = props;
	try {
		const del = await deleteHelper(url);
		const severity = del.code === 200 ? ESeverity.SUCCESS : ESeverity.ERROR;
		openNotif(del.message, severity);
		fetchBridgeLevelPerilakuTable(pageRequest, setPages);
	} catch (error) {
		const err = error as Error;
		openNotif(err.message, ESeverity.ERROR);
	}
}
