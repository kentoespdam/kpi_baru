import dynamic from "next/dynamic";

const BridgeKpiComponent = dynamic(() => import("@components/bridge/kpi"));
const CardBuilder = dynamic(() => import("@components/commons/card"));

export const metadata = {
	title: "Bridge KPI",
};
const BridgeKpi = () => {
	return (
		<CardBuilder title={metadata.title} isLink={true}>
			<BridgeKpiComponent />
		</CardBuilder>
	);
};

export default BridgeKpi;
