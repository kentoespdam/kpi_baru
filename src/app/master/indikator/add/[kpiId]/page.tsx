import dynamic from "next/dynamic";

const MuiContainer = dynamic(() => import("@components/commons/mui/container"));
const CardBuilder = dynamic(() => import("@components/commons/card"));
const IndikatorFormComponent = dynamic(
	() => import("@components/master/indikator/form")
);

export const metadata = { title: "Add Master Indikator" };
const AddMasterIndikator = ({ params }: { params: { kpiId: number } }) => {
	const { kpiId } = params;
	return (
		<MuiContainer maxWidth="xs">
			<CardBuilder title={metadata.title} isLink={false} color="success">
				<IndikatorFormComponent idKpi={kpiId} />
			</CardBuilder>
		</MuiContainer>
	);
};

export default AddMasterIndikator;
