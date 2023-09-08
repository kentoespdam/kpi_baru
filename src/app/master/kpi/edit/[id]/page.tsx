import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";
import KpiFormComponent from "@components/master/kpi/form";

export const metadata = {
	title: "Edit Master KPI",
	description: "Add Master KPI",
};
const EditMasterKpi = ({ params }: { params: { id: number } }) => {
	const { id } = params;
	return (
		<MuiContainer maxWidth="xs">
			<CardBuilder title={metadata.title} isLink={false} color="success">
				<KpiFormComponent id={id} />
			</CardBuilder>
		</MuiContainer>
	);
};

export default EditMasterKpi;
