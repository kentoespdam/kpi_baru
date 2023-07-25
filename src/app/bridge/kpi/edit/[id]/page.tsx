import BridgeKpiForm from "@components/bridge/kpi/form";
import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";

export const metadata = { title: "Edit Bridge KPI" };
const EditBridgeKpi = ({ params }: { params: { id: number } }) => {
	const { id } = params;
	return (
		<MuiContainer maxWidth="xs">
			<CardBuilder title={metadata.title} isLink={false} color="success">
				<BridgeKpiForm id={id} />
			</CardBuilder>
		</MuiContainer>
	);
};

export default EditBridgeKpi;
