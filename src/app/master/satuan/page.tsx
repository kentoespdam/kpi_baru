import dynamic from "next/dynamic";

const CardBuilder = dynamic(() => import("@components/commons/card"));
const SatuanComponent = dynamic(() => import("@components/master/satuan"));

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
