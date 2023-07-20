import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";
import KpiFormComponent from "@components/master/kpi/form";

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
