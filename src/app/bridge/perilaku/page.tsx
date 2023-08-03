import BridgePerilakuComponent from "@components/bridge/perilaku";
import CardBuilder from "@components/commons/card";

export const metadata = {
	title: "Bridge Perilaku",
};
const BridgePerilaku = () => {
	return (
		<CardBuilder title={metadata.title} isLink={true}>
			<BridgePerilakuComponent />
		</CardBuilder>
	);
};

export default BridgePerilaku;
