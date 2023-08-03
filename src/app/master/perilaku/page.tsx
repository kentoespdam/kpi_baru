import CardBuilder from "@components/commons/card";
import PerilakuComponent from "@components/master/perilaku";

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
