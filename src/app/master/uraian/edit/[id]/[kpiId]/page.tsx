import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";
import UraianFormComponent from "@components/master/uraian/form";

export const metadata = { title: "Edit Master Uraian" };
const EditMasterUraian = ({
	params,
}: {
	params: { id: number; kpiId: number };
}) => {
	const { id, kpiId } = params;
	return (
		<MuiContainer maxWidth="xs">
			<CardBuilder title={metadata.title} isLink={false} color="warning">
				<UraianFormComponent uraianId={id} idKpi={kpiId} />
			</CardBuilder>
		</MuiContainer>
	);
};

export default EditMasterUraian;
