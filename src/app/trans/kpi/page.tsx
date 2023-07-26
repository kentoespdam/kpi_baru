import CardBuilder from "@components/commons/card";
import TransRoot from "@components/trans";

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
