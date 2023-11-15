"use client";

import Stack from "@mui/material/Stack";
import KpiAdminFilter from "./filter";
import { useQueries } from "@tanstack/react-query";
import { getList as getOrgList } from "@utils/eo/organization";
import KpiAdminDetail from "./detail";
import { useKpiAdminStore } from "@store/filter/trans/kpi.admin";
import { getList as getBridgeKpiList } from "@utils/bridge/kpi";
import { getEmpDetails } from "@utils/eo/employee";

const TransKpiAdminComponent = () => {
	const { periode, rootNipam, bridgeKpi } = useKpiAdminStore();
	const queries = useQueries({
		queries: [
			{ queryKey: ["orgTree"], queryFn: getOrgList },
			{ queryKey: ["kpi.admin.bridge.list"], queryFn: getBridgeKpiList },
			{
				queryKey: ["kpi.admin.biodata", rootNipam],
				queryFn: getEmpDetails,
				enabled: !!rootNipam,
			},
		],
	});
	return (
		<Stack direction="column" spacing={2}>
			<KpiAdminFilter />
			<KpiAdminDetail periode={periode} bridgeKpi={bridgeKpi} />
		</Stack>
	);
};

export default TransKpiAdminComponent;
