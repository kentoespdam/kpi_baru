import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PeriodeComponent from "./periode";
import KpiStaffComponents from "./staff";

const KpiCard = () => {
	return (
		<Card>
			<CardContent>
				<PeriodeComponent />
				<KpiStaffComponents />
			</CardContent>
		</Card>
	);
};

export default KpiCard;
