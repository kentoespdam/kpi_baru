import dynamic from "next/dynamic";

const MuiContainer = dynamic(() => import("@mui/material/Container"));
const CardBuilder = dynamic(() => import("@components/commons/card"));
const UraianFormComponent = dynamic(
	() => import("@components/master/uraian/form")
);

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
