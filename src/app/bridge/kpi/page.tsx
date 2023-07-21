import BridgeKpiComponent from "@components/bridge/kpi";
import CardBuilder from "@components/commons/card";

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
