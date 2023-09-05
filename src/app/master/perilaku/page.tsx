import dynamic from "next/dynamic";

const CardBuilder = dynamic(() => import("@components/commons/card"));
const PerilakuComponent = dynamic(() => import("@components/master/perilaku"));

export const metadata = {
	title: "Master Perilaku",
};
const MasterPerilaku = () => {
	return (
		<CardBuilder title={metadata.title} isLink={true}>
			<PerilakuComponent />
		</CardBuilder>
	);
};

export default MasterPerilaku;
