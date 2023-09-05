import dynamic from "next/dynamic";

const CardBuilder = dynamic(() => import("@components/commons/card"));
const LevelComponent = dynamic(() => import("@components/master/level"));

export const metadata = {
	title: "Master Level",
};
const MasterLevel = () => {
	return (
		<CardBuilder title={metadata.title} isLink={true}>
			<LevelComponent />
		</CardBuilder>
	);
};

export default MasterLevel;
