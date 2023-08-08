import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PeriodeComponent from "@trans/kpi/periode";
import KpiStaffComponents from "@trans/kpi/staff";
import ViewFileDialog from "@transDialog/file";
import ViewFormDialog from "@transDialog/form";
import ViewPdfDialog from "@transDialog/pdf";
import ViewUploadDialog from "@transDialog/upload";

const KpiCard = () => {
	return (
		<Card>
			<CardContent>
				<PeriodeComponent />
				<KpiStaffComponents />
			</CardContent>
			<ViewFileDialog />
			<ViewPdfDialog />
			<ViewUploadDialog />
			<ViewFormDialog />
		</Card>
	);
};

export default KpiCard;
