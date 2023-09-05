import dynamic from "next/dynamic";

const MuiContainer = dynamic(() => import("@mui/material/Container"));
const CardBuilder = dynamic(() => import("@components/commons/card"));
const BridgePerilakuForm = dynamic(
	() => import("@components/bridge/perilaku/form/index")
);

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
