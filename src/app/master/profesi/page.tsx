import dynamic from "next/dynamic";

const CardBuilder = dynamic(() => import("@components/commons/card"));
const ProfesiComponent = dynamic(() => import("@components/master/profesi"));

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
