import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";
import TransKpiStaffUploadComponent from "@components/trans/kpi/staff/upload";

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
