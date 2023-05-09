import { objectToQueryString } from "@commons/helpers/fetch.helper";
import {
	deleteHelper,
	getHelper,
	postHelper,
	putHelper,
} from "@commons/helpers/useAsync";
import { ESeverity } from "@commons/interfaces/EStatus";
import {
	IGradeForm,
	IPageGradeRequest,
	IPageGradeResponse,
	LOCAL_GRADE,
} from "@commons/interfaces/IGrade";
import {
	IFormStore,
	IPageRequestStore,
	IPagesStore,
} from "@commons/interfaces/store";
import { create } from "zustand";

interface IGradeStore
	extends IFormStore<IGradeForm>,
		IPageRequestStore<IPageGradeRequest>,
		IPagesStore<IPageGradeResponse> {}

export const useGradeStore = create<IGradeStore>((set) => ({
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

export const fetchGradeTable = async (
	pageRequest: IPageGradeRequest,
	setPages: (v: IPageGradeResponse) => void
) => {
	const search = objectToQueryString(pageRequest);
	const result: IPageGradeResponse = await getHelper(
		`${LOCAL_GRADE}${search}`
	);
	setPages(result);
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
		const result = await getHelper(`${LOCAL_GRADE}${search}`);
		setPages(result);
	} catch (e) {
		const err = e as Error;
		openNotif(err.message, ESeverity.ERROR);
	}
}

export async function handleSaveGrade(
	openNotif: (message: string, severity: ESeverity) => void,
	toggleDialog: () => void,
	form: IGradeForm,
	pageRequest: IPageGradeRequest,
	setPages: (v: IPageGradeResponse) => void,
	action: "create" | "update"
) {
	try {
		form.levelId = form.level?.id;
		delete form.level;

		const save =
			action === "create"
				? await postHelper(LOCAL_GRADE, form)
				: await putHelper(LOCAL_GRADE, form);
		openNotif(save.message, ESeverity.SUCCESS);

		const search = objectToQueryString(pageRequest);
		const result = await getHelper(`${LOCAL_GRADE}${search}`);
		setPages(result);
		toggleDialog();
	} catch (e) {
		const err = e as Error;
		openNotif(err.message, ESeverity.ERROR);
	}
	toggleDialog();
}
