import dynamic from "next/dynamic";

const MuiContainer = dynamic(() => import("@mui/material/Container"));
const CardBuilder = dynamic(() => import("@components/commons/card"));
const BridgeKpiForm = dynamic(() => import("@components/bridge/kpi/form"));

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
