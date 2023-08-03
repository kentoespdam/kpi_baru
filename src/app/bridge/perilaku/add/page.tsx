import BridgePerilakuForm from "@components/bridge/perilaku/form";
import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";

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
