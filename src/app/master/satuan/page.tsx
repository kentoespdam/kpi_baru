import CardBuilder from "@components/commons/card";
import SatuanComponent from "@components/master/satuan";

export const metadata = {
	title: "Master Satuan",
};
const SatuanPage = () => {
	return (
		<CardBuilder title={metadata.title} isLink={true}>
			<SatuanComponent />
		</CardBuilder>
	);
};

export default SatuanPage;
