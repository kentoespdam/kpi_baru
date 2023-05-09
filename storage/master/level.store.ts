import {
	filterToRequest,
	objectToQueryString,
} from "@commons/helpers/fetch.helper";
import {
	deleteHelper,
	getHelper,
	postHelper,
	putHelper,
} from "@commons/helpers/useAsync";
import { ESeverity } from "@commons/interfaces/EStatus";
import { SelectType } from "@commons/interfaces/ICommons";
import {
	ILevelForm,
	ILevelResponse,
	IPageLevelRequest,
	IPageLevelResponse,
	LOCAL_LEVEL,
} from "@commons/interfaces/ILevel";
import {
	IFormStore,
	IPageRequestStore,
	IPagesStore,
} from "@commons/interfaces/store";
import { create } from "zustand";

interface ILevelStore
	extends IFormStore<ILevelForm>,
		IPageRequestStore<IPageLevelRequest>,
		IPagesStore<IPageLevelResponse> {}

export const useLevelStore = create<ILevelStore>((set) => ({
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
	},
	setPageRequest: (value) => {
		set((state) => ({ ...state, pageRequest: value }));
	},
	setPages: async (value) => {
		set((state) => ({ ...state, pages: value }));
	},
}));

export const fetchLevelTable = async (
	pageRequest: IPageLevelRequest,
	setPage: (v: IPageLevelResponse) => void
) => {
	try {
		const search = objectToQueryString(pageRequest);
		const result: IPageLevelResponse = await getHelper(
			`${LOCAL_LEVEL}${search}`
		);
		setPage(result);
	} catch (error) {
		const err = error as Error;
		console.log(err.message);
	}
};

export const fetchLevelList = async () => {
	const result = await getHelper(`${LOCAL_LEVEL}/list`);
	return result.data;
};

export const handleSave = async (
	openNotif: (message: string, severity: ESeverity) => void,
	toggleDialog: () => void,
	form: ILevelForm,
	pageRequest: IPageLevelRequest,
	setPage: (data: IPageLevelResponse) => void,
	action: "create" | "update"
) => {
	try {
		const kirim: ILevelResponse =
			action === "create"
				? await postHelper(LOCAL_LEVEL, form)
				: await putHelper(LOCAL_LEVEL, form);
		openNotif(kirim.message, ESeverity.SUCCESS);

		const search = objectToQueryString(pageRequest);
		const result: IPageLevelResponse = await getHelper(
			`${LOCAL_LEVEL}${search}`
		);
		setPage(result);
	} catch (e: any) {
		openNotif(e.message, ESeverity.ERROR);
	}
	toggleDialog();
};

export type findHandlerProps = {
	filterOptions?: SelectType[];
	setPageRequest: (v: IPageLevelRequest) => void;
	setPages: (v: IPageLevelResponse) => void;
};
export const findHandler = async (props: findHandlerProps) => {
	const { filterOptions, setPageRequest: setPageRequest, setPages } = props;
	if (filterOptions === undefined) return;
	const fromFilter = filterToRequest(filterOptions);
	const request: IPageLevelRequest = {
		...fromFilter,
		page: 0,
		size: 10,
	};
	setPageRequest(request);
	await fetchLevelTable(request, setPages);
};

export async function handleDelete(
	id: number,
	openNotif: (message: string, severity: ESeverity) => void,
	pageRequest: IPageLevelRequest,
	setPages: (data: IPageLevelResponse) => void
) {
	const url = `${LOCAL_LEVEL}/${id}`;
	try {
		const hapus = await deleteHelper(url);
		const severity =
			hapus.code === 200 ? ESeverity.SUCCESS : ESeverity.ERROR;

		openNotif(hapus.message, severity);
		const search = objectToQueryString(pageRequest);
		const result: IPageLevelResponse = await getHelper(
			`${LOCAL_LEVEL}${search}`
		);
		setPages(result);
	} catch (e) {
		const error = e as Error;
		openNotif(error.message, ESeverity.ERROR);
	}
}
