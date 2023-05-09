import { objectToQueryString } from "@helpers/fetch.helper";
import {
	deleteHelper,
	getHelper,
	postHelper,
	putHelper,
} from "@helpers/useAsync";
import { ESeverity } from "@interfaces/EStatus";
import {
	IBridgeKpiPegawaiForm,
	IBridgeKpiPegawaiWithAudit,
	IPageBridgeKpiPegawaiRequest,
	IPageBridgeKpiPegawaiResponse,
	LOCAL_BRIDGE_KPI_PEGAWAI,
} from "@interfaces/IBridgeKpiPegawai";
import { IEmployee, LOCAL_EMPLOYEE } from "@interfaces/IEmployee";
import { IFormStore, IPageRequestStore, IPagesStore } from "@interfaces/store";
import { create } from "zustand";

interface IBridgeKpiPegawaiStore
	extends IFormStore<IBridgeKpiPegawaiForm>,
		IPageRequestStore<IPageBridgeKpiPegawaiRequest>,
		IPagesStore<IPageBridgeKpiPegawaiResponse>,
		IPageRequestStore<IPageBridgeKpiPegawaiRequest>,
		IPagesStore<IPageBridgeKpiPegawaiResponse> {}

export const useBridgeKpiPegawaiStore = create<IBridgeKpiPegawaiStore>(
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

export const fetchBridgeKpiPegawaiTable = async (
	pageRequest: IPageBridgeKpiPegawaiRequest,
	setPages: (v?: IPageBridgeKpiPegawaiResponse) => void
) => {
	try {
		const search = objectToQueryString(pageRequest);

		const kpiPegawai = await getHelper(
			`${LOCAL_BRIDGE_KPI_PEGAWAI}${search}`
		);
		const nipamList = kpiPegawai.data.content.map(
			(k: IBridgeKpiPegawaiWithAudit) => k.nipam
		);

		const pegawaiList = await getHelper(
			`${LOCAL_EMPLOYEE}/in?nipam=${nipamList.join(",")}`
		);

		kpiPegawai.data.content = kpiPegawai.data.content.map(
			(k: IBridgeKpiPegawaiWithAudit) => {
				const pegawai = pegawaiList.data.find(
					(p: IEmployee) => p.nipam === k.nipam
				);
				k.employee = pegawai;
				return k;
			}
		);

		setPages(kpiPegawai);
	} catch (error) {
		console.log(error);
		setPages();
	}
};

export async function handleSave(
	openNotif: (v: string, s: ESeverity) => void,
	toggleDialog: () => void,
	form: IBridgeKpiPegawaiForm,
	pageRequest: IPageBridgeKpiPegawaiRequest,
	setPages: (v?: IPageBridgeKpiPegawaiResponse) => void,
	action: "create" | "update"
) {
	try {
		form.nipam = form.employee?.nipam;
		delete form.employee;
		form.levelId = form.level?.id;
		delete form.level;
		form.kpiId = form.kpi?.id;
		delete form.kpi;

		const save =
			action === "create"
				? await postHelper(LOCAL_BRIDGE_KPI_PEGAWAI, form)
				: await putHelper(`${LOCAL_BRIDGE_KPI_PEGAWAI}`, form);
		openNotif(save.message, ESeverity.SUCCESS);

		fetchBridgeKpiPegawaiTable(pageRequest, setPages);
		toggleDialog();
	} catch (error) {
		const err = error as Error;
		openNotif(err.message, ESeverity.ERROR);
	}
}

type handleDeleteProps = {
	url: string;
	openNotif: (v: string, s: ESeverity) => void;
	pageRequest: IPageBridgeKpiPegawaiRequest;
	setPages: (v?: IPageBridgeKpiPegawaiResponse) => void;
};
export async function handleDelete(props: handleDeleteProps) {
	const { url, openNotif, pageRequest, setPages } = props;
	try {
		const del = await deleteHelper(url);
		const severity = del.code === 200 ? ESeverity.SUCCESS : ESeverity.ERROR;
		openNotif(del.message, severity);
		fetchBridgeKpiPegawaiTable(pageRequest, setPages);
	} catch (error) {
		const err = error as Error;
		openNotif(err.message, ESeverity.ERROR);
	}
}
