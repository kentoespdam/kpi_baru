import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PeriodeComponent from "./periode";
import KpiStaffComponents from "./staff";
import ViewFileDialog from "./dialog/file";
import ViewPdfDialog from "./dialog/pdf";
import ViewUploadDialog from "./dialog/upload";

const KpiCard = () => {
	return (
		<Card>
			<CardContent>
				<Box>
					<PeriodeComponent />
					<KpiStaffComponents />
				</Box>
			</CardContent>
			<ViewFileDialog />
			<ViewPdfDialog />
			<ViewUploadDialog />
		</Card>
	);
};

export default KpiCard;
