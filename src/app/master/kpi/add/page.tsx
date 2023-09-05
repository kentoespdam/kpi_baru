import dynamic from "next/dynamic";

const MuiContainer = dynamic(() => import("@components/commons/mui/container"));
const CardBuilder = dynamic(() => import("@components/commons/card"));
const KpiFormComponent = dynamic(() => import("@components/master/kpi/form"));

export const metadata = {
	title: "Add Master KPI",
	description: "Add Master KPI",
};
const AddMasterKpi = () => {
	return (
		<MuiContainer maxWidth="xs">
			<CardBuilder title={metadata.title} isLink={false} color="success">
				<KpiFormComponent />
			</CardBuilder>
		</MuiContainer>
	);
};

export default AddMasterKpi;
