import {
	BridgeKpiWithAudit,
	LOCAL_BRIDGE_KPI,
} from "@myTypes/entity/bridge.kpi";
import { LOCAL_TRANS_KPI } from "@myTypes/entity/trans.kpi";
import { useTransKinerjaStore } from "@store/filter/trans/kinerja";
import { useTransPerilakuStore } from "@store/filter/trans/perilaku";
import axios from "axios";

export const getStaffKpi = async (props: any) => {
	const { queryKey } = props;
	const { nipam, periode, kpiId } = queryKey[1];

	try {
		const { data } = await axios.get(
			`${LOCAL_TRANS_KPI}/staff/${nipam}/${periode}/${kpiId}`
		);
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.trans.kpi.staff",
			new Date().toISOString(),
			e.response.data
		);
		throw new Error(e.response.data.message);
	}
};

export const getBridgeKpi = async (props: any): Promise<BridgeKpiWithAudit> => {
	const { queryKey } = props;
	const nipam = queryKey[1];
	try {
		const { data } = await axios.get(`${LOCAL_BRIDGE_KPI}/nipam/${nipam}`);
		useTransKinerjaStore.setState({ bridgeKpiBawahan: data.data });
		useTransPerilakuStore.setState({ levelStaff: data.data.level.id });
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.bridge.kpi.get.nipam",
			new Date().toISOString(),
			e.response.data
		);
		useTransKinerjaStore.setState({ bridgeKpiBawahan: null });
		useTransPerilakuStore.setState({ levelStaff: null });
		throw new Error(e.response.data.message);
	}
};
