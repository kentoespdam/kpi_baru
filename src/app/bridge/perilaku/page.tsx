import dynamic from "next/dynamic";

const BridgePerilakuComponent = dynamic(
	() => import("@components/bridge/perilaku")
);
const CardBuilder = dynamic(() => import("@components/commons/card"));

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
