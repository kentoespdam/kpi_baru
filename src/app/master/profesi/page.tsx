import CardBuilder from "@components/commons/card";
import ProfesiComponent from "@components/master/profesi";

export const metadata = {
	title: "Master Profesi",
};
const MasterProfesi = () => {
	return (
		<CardBuilder title={metadata.title} isLink={true}>
			<ProfesiComponent />
		</CardBuilder>
	);
};

export default MasterProfesi;
