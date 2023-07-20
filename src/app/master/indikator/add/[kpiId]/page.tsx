import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";
import IndikatorFormComponent from "@components/master/indikator/form";

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
