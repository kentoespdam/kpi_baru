import CardBuilder from "@components/commons/card";
import KpiComponent from "@components/master/kpi";

export const metadata = {
	title: "Master KPI",
};
const MasterKpi = () => {
	return (
		<CardBuilder title={metadata.title} isLink={true}>
			<KpiComponent />
		</CardBuilder>
	);
};

export default MasterKpi;
