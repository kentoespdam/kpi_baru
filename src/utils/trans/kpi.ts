import {
	BridgeKpiWithAudit,
	LOCAL_BRIDGE_KPI,
} from "@myTypes/entity/bridge.kpi";
import { LOCAL_TRANS_KPI } from "@myTypes/entity/trans.kpi";
import { useTransKpiBawahanStore } from "@store/filter/trans/bawahan";
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
		useTransKpiBawahanStore.setState({ bridgeKpiBawahan: data.data });
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.bridge.kpi.getByNipam",
			new Date().toISOString(),
			e.response.data
		);
		useTransKpiBawahanStore.setState({ bridgeKpiBawahan: null });
		throw new Error(e.response.data.message);
	}
};
