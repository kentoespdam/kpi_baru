import dynamic from "next/dynamic";

const CardBuilder = dynamic(() => import("@components/commons/card"));
const ViewPdfComponent = dynamic(() => import("@trans/view/pdf"));

export const metadata = { title: "View Pdf File" };
const TransKpiViewPdf = ({ params }: { params: { id: number } }) => {
	const { id } = params;
	return (
		<CardBuilder title={metadata.title} isLink={false}>
			<ViewPdfComponent id={id} />
		</CardBuilder>
	);
};

export default TransKpiViewPdf;
