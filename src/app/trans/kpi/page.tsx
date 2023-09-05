import dynamic from "next/dynamic";

const CardBuilder = dynamic(() => import("@components/commons/card"));
const TransRoot = dynamic(() => import("@components/trans"));

export const metadata = {
	title: "Penilaian Pencapaian Kinerja Individu",
};
const TransKpi = () => {
	return (
		<CardBuilder title={metadata.title} isLink={false}>
			<TransRoot />
		</CardBuilder>
	);
};

export default TransKpi;
