import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useEffect } from "react";
import PeriodeComponent from "./periode";
import KpiStaffComponents from "./staff";

const KpiCard = () => {
	const { periode } = useTransKpiStore();

	useEffect(() => console.log(periode), [periode]);
	return (
		<Card>
			<CardContent>
				<Box>
					<PeriodeComponent />
					<KpiStaffComponents />
				</Box>
			</CardContent>
		</Card>
	);
};

export default KpiCard;
