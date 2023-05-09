import { objectToQueryString } from "@helpers/fetch.helper";
import {
	deleteHelper,
	getHelper,
	postHelper,
	putHelper
} from "@helpers/useAsync";
import { ESeverity } from "@interfaces/EStatus";
import {
	IKpiForm,
	IKpiWithAudit,
	IPageKpiRequest,
	IPageKpiResponse,
	LOCAL_KPI
} from "@interfaces/IKpi";
import { IOrganization } from "@interfaces/IOrganization";
import { IPosition } from "@interfaces/IPosition";
import { IFormStore, IPageRequestStore, IPagesStore } from "@interfaces/store";
import { getOrganization } from "@utils/get.organization";
import { getPosition } from "@utils/get.position";
import { create } from "zustand";

interface IKpiStore
	extends IFormStore<IKpiForm>,
		IPageRequestStore<IPageKpiRequest>,
		IPagesStore<IPageKpiResponse> {}

export const useKpiStore = create<IKpiStore>((set) => ({
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

export const fetchKpiTable = async (
	pageRequest: IPageKpiRequest,
	setPages: (v?: IPageKpiResponse) => void
) => {
	try {
		const search = objectToQueryString(pageRequest);

		const [result, orgList, positionList] = await Promise.all([
			await getHelper(`${LOCAL_KPI}${search}`),
			await getOrganization(),
			await getPosition(),
		]);

		result.data.content = result.data.content.map((v: IKpiWithAudit) => {
			const org = orgList.data.find(
				(o: IOrganization) => o.id === v.organizationId
			);
			v.organization = org;
			const position = positionList.data.find(
				(p: IPosition) => p.id === v.positionId
			);
			v.position = position;
			return v;
		});

		setPages(result);
	} catch (error) {
		console.log("error", error);
		setPages(undefined);
	}
};

export async function handleSave(
	openNotif: (v: string, s: ESeverity) => void,
	toggleDialog: () => void,
	form: IKpiForm,
	pageRequest: IPageKpiRequest,
	setPages: (v?: IPageKpiResponse) => void,
	action: "create" | "update"
) {
	try {
		form.organizationId = form.organization?.id;
		delete form.organization;
		form.positionId = form.position?.id;
		delete form.position;
		form.profesiId = form.profesi?.id;
		delete form.profesi;
		form.gradeId = form.grade?.id;
		delete form.grade;

		const save =
			action === "create"
				? await postHelper(LOCAL_KPI, form)
				: await putHelper(LOCAL_KPI, form);
		openNotif(save.message, ESeverity.SUCCESS);

		fetchKpiTable(pageRequest, setPages);
		toggleDialog();
	} catch (error) {
		const err = error as Error;
		openNotif(err.message, ESeverity.ERROR);
	}
}

type handleDeleteProps = {
	url: string;
	openNotif: (v: string, s: ESeverity) => void;
	setPages: (v?: IPageKpiResponse) => void;
	pageRequest: IPageKpiRequest;
};
export async function handleDelete(props: handleDeleteProps) {
	const { url, openNotif, setPages, pageRequest } = props;
	try {
		const hapus = await deleteHelper(url);
		const severity =
			hapus.code === 200 ? ESeverity.SUCCESS : ESeverity.ERROR;

		openNotif(hapus.message, severity);
		fetchKpiTable(pageRequest, setPages);
	} catch (error) {
		const err = error as Error;
		openNotif(err.message, ESeverity.ERROR);
	}
}
