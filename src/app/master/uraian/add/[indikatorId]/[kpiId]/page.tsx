import dynamic from "next/dynamic";

const MuiContainer = dynamic(() => import("@mui/material/Container"));
const CardBuilder = dynamic(() => import("@components/commons/card"));
const UraianFormComponent = dynamic(
	() => import("@components/master/uraian/form")
);

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
