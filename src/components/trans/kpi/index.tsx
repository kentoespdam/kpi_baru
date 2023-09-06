import dynamic from "next/dynamic";

const Card = dynamic(() => import("@mui/material/Card"));
const CardContent = dynamic(() => import("@mui/material/CardContent"));
const PeriodeComponent = dynamic(() => import("@trans/kpi/periode"));
const KpiStaffComponents = dynamic(() => import("@trans/kpi/staff"));

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
