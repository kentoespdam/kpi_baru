"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { DetEmployee } from "@myTypes/entity/det.employee";
import { useKpiAdminStore } from "@store/filter/trans/kpi.admin";
import { useQuery } from "@tanstack/react-query";
import { getEmpDetails } from "@utils/eo/employee";
import dynamic from "next/dynamic";
import KpiAdminBawahan from "./bawahan";
import KpiAdminBiodata from "./biodata";
import KpiAdminFilter from "./filter";
import KpiAdminTab from "./tabs";
const ViewFormKinerjaDialog = dynamic(
	() => import("@transDialog/form/kinerja")
);
const ViewFormPerilakuDialog = dynamic(
	() => import("@transDialog/form/perilaku")
);

const TransKpiAdminComponent = () => {
	const { periode, bridgeKpi } = useKpiAdminStore();

	const { data } = useQuery<DetEmployee>({
		queryKey: ["kpi-admin-biodata", bridgeKpi?.nipam],
		queryFn: getEmpDetails,
		enabled: !!bridgeKpi?.nipam,
	});

	return (
		<>
			<KpiAdminFilter />
			<KpiAdminBiodata
				nama={data?.curr.nama ?? "Waiting for Search Pegawai"}
				posName={data?.curr.position.name ?? ""}
				orgName={data?.curr.organization.name ?? ""}
			/>
			<KpiAdminTab periode={periode} bridgeKpi={bridgeKpi} />

			{data?.staff && data.staff.length > 0 ? (
				<Card>
					<CardContent sx={{ p: 0 }}>
						<Typography variant="h3" sx={{ m: 1 }}>
							Daftar Staf
						</Typography>
						{/* <Divider sx={{ mb: 1 }} /> */}
						{data.staff.map((staff, index) => (
							<KpiAdminBawahan employee={staff} key={index} />
						))}
					</CardContent>
				</Card>
			) : null}

			<ViewFormKinerjaDialog periode={periode} isAdmin />
			<ViewFormPerilakuDialog periode={periode} isAdmin />
		</>
	);
};

export default TransKpiAdminComponent;
