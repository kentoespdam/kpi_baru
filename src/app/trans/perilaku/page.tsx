import dynamic from "next/dynamic";

const CardBuilder = dynamic(() => import("@components/commons/card"));

export const metadata = {
	title: "Transaksi Perilaku",
};
const TransPerilaku = () => {
	return (
		<CardBuilder title={metadata.title} isLink={true}>
			hahaha
		</CardBuilder>
	);
};

export default TransPerilaku;
