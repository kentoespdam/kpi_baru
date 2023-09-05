import dynamic from "next/dynamic";

const MuiContainer = dynamic(() => import("@mui/material/Container"));
const CardBuilder = dynamic(() => import("@components/commons/card"));
const BridgePerilakuForm = dynamic(
	() => import("@components/bridge/perilaku/form/index")
);

export const metadata = { title: "Add Bridge Perilaku" };
const AddBridgePerilaku = () => {
	return (
		<MuiContainer maxWidth="xs">
			<CardBuilder title={metadata.title} isLink={false} color="success">
				<BridgePerilakuForm />
			</CardBuilder>
		</MuiContainer>
	);
};

export default AddBridgePerilaku;
