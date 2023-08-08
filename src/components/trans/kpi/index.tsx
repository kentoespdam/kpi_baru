import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PeriodeComponent from "@trans/kpi/periode";
import KpiStaffComponents from "@trans/kpi/staff";

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
