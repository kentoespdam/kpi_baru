import CardBuilder from "@components/commons/card";
import LevelComponent from "@components/master/level";

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
