import dynamic from "next/dynamic";
import RootLoading from "src/app/loading";

const MuiContainer = dynamic(() => import("@mui/material/Container"));
const CardBuilder = dynamic(() => import("@components/commons/card"));
const BridgeKpiForm = dynamic(() => import("@components/bridge/kpi/form"), {
	ssr: false,
	loading: () => <RootLoading />,
});

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
