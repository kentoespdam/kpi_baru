"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useKpiAdminStore } from "@store/filter/trans/kpi.admin";
import { useQueries } from "@tanstack/react-query";
import { getEmpDetails } from "@utils/eo/employee";
import dynamic from "next/dynamic";
import KpiAdminBawahan from "./bawahan";
import KpiAdminBiodata from "./biodata";
import KpiAdminFilter from "./filter";
import KpiAdminTab from "./tabs";
import { getList } from "@utils/eo/organization";
import { Employee } from "@myTypes/entity/employee";
import { getList as getBridgeKpiList } from "@utils/bridge/kpi";
const ViewFormKinerjaDialog = dynamic(
	() => import("@transDialog/form/kinerja")
);
const ViewFormPerilakuDialog = dynamic(
	() => import("@transDialog/form/perilaku")
);

const TransKpiAdminComponent = () => {
	const { periode, bridgeKpi } = useKpiAdminStore();
	const queries = useQueries({
		queries: [
			{ queryKey: ["orgTree"], queryFn: getList },
			{
				queryKey: ["kpi-admin-biodata", bridgeKpi?.nipam],
				queryFn: getEmpDetails,
				enabled: !!bridgeKpi?.nipam,
			},
			{
				queryKey: ["bridge-kpi.autocomplete"],
				queryFn: getBridgeKpiList,
			},
		],
	});

	return (
		<Stack direction="column" spacing={1} sx={{ flex: 1 }}>
			<KpiAdminFilter />
			<KpiAdminBiodata
				nama={
					queries[1].data?.curr.nama ?? "Waiting for Search Pegawai"
				}
				posName={queries[1].data?.curr.position.name ?? ""}
				orgName={queries[1].data?.curr.organization.name ?? ""}
			/>
			<KpiAdminTab periode={periode} bridgeKpi={bridgeKpi} />

			{queries[1].data?.staff && queries[1].data.staff.length > 0 ? (
				<Card>
					<CardContent sx={{ p: 0 }}>
						<Typography variant="h3" sx={{ m: 1 }}>
							Daftar Staf
						</Typography>
						{/* <Divider sx={{ mb: 1 }} /> */}
						{queries[1].data.staff.map(
							(staff: Employee, index: number) => (
								<KpiAdminBawahan
									employee={staff}
									periode={periode}
									key={index}
								/>
							)
						)}
					</CardContent>
				</Card>
			) : null}

			<ViewFormKinerjaDialog periode={periode} isAdmin />
			<ViewFormPerilakuDialog periode={periode} isAdmin />
		</Stack>
	);
};

export default TransKpiAdminComponent;
