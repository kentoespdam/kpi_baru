import dynamic from "next/dynamic";

const MuiContainer = dynamic(() => import("@components/commons/mui/container"));
const CardBuilder = dynamic(() => import("@components/commons/card"));
const KpiFormComponent = dynamic(() => import("@components/master/kpi/form"));

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
