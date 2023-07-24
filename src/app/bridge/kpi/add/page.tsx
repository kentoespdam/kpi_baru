import BridgeKpiForm from "@components/bridge/kpi/form";
import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";

export const metadata = { title: "Add Bridge KPI" };
const AddBridgeKpi = () => {
	return (
		<MuiContainer maxWidth="xs">
			<CardBuilder title={metadata.title} isLink={false} color="success">
				<BridgeKpiForm />
			</CardBuilder>
		</MuiContainer>
	);
};

export default AddBridgeKpi;
