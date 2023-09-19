import CardBuilder from "@components/commons/card";
import TransKpiAdminComponent from "@components/trans/admin";

export const metadata = {
	title: "Penilaian Pencapaian Kinerja Individu",
};
const TransKpiAdmin = () => {
	return (
		<CardBuilder title={metadata.title} isLink={false}>
			<TransKpiAdminComponent />
		</CardBuilder>
	);
};

export default TransKpiAdmin;
