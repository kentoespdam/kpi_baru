import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ViewFileDialog from "./dialog/file";
import ViewPdfDialog from "./dialog/pdf";
import ViewUploadDialog from "./dialog/upload";
import PeriodeComponent from "./periode";
import KpiStaffComponents from "./staff";

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
		</Card>
	);
};

export default KpiCard;
