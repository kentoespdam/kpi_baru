import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";
import UraianFormComponent from "@components/master/uraian/form";

export const metadata = { title: "Add Master Uraian" };
const AddMasterUraian = ({
	params,
}: {
	params: { indikatorId: number; kpiId: number };
}) => {
	const { indikatorId, kpiId } = params;
	return (
		<MuiContainer maxWidth="xs">
			<CardBuilder title={metadata.title} isLink={false} color="success">
				<UraianFormComponent idIndikator={indikatorId} idKpi={kpiId} />
			</CardBuilder>
		</MuiContainer>
	);
};

export default AddMasterUraian;
