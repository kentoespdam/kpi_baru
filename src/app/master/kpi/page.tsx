import dynamic from "next/dynamic";

const CardBuilder = dynamic(() => import("@components/commons/card"));
const KpiComponent = dynamic(() => import("@components/master/kpi"));

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
