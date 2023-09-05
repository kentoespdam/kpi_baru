import dynamic from "next/dynamic";

const CardBuilder = dynamic(() => import("@components/commons/card"));

export const metadata = {
	title: "Master Indikator",
};
const MasterIndikator = () => {
	return (
		<CardBuilder title={metadata.title} isLink={true}>
			hahaha
		</CardBuilder>
	);
};

export default MasterIndikator;
