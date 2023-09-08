import BridgePerilakuForm from "@components/bridge/perilaku/form";
import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";

export const metadata = { title: "Edit Bridge Perilaku" };
const EditBridgePerilaku = ({ params }: { params: { id: number } }) => {
	const { id } = params;
	return (
		<MuiContainer maxWidth="xs">
			<CardBuilder title={metadata.title} isLink={false} color="success">
				<BridgePerilakuForm id={id} />
			</CardBuilder>
		</MuiContainer>
	);
};

export default EditBridgePerilaku;
