import dynamic from "next/dynamic";
const MuiContainer = dynamic(() => import("@components/commons/mui/container"));
const CardBuilder = dynamic(() => import("@components/commons/card"));
const TransKpiStaffUploadComponent = dynamic(
	() => import("@components/trans/kpi/staff/upload")
);

export const metadata = { title: "Upload File KPI" };
const TransKpiUploadFile = ({ params }: { params: { uraianId: number } }) => {
	const { uraianId } = params;

	return (
		<MuiContainer maxWidth="xs">
			<CardBuilder title={metadata.title} isLink={false} color="success">
				<TransKpiStaffUploadComponent uraianId={uraianId} />
			</CardBuilder>
		</MuiContainer>
	);
};

export default TransKpiUploadFile;
