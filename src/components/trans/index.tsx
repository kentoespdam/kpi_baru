"use client";

import { useSessionStore } from "@store/main/session";
import { useQueries } from "@tanstack/react-query";
import { getEmpDetails } from "@utils/eo/employee";
import EmployeeComponent from "./employee";
import KpiStaffComponents from "./kpi/staff";
import KpiCard from "./kpi";
import Stack from "@mui/material/Stack";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { getStaffKpi } from "@utils/trans/kpi";
import { getByNipam } from "@utils/bridge/kpi";
import { shallow } from "zustand/shallow";

const TransRoot = () => {
	const curNipam = useSessionStore.getState().user?.userId;
	const { periode, bridgeKpi } = useTransKpiStore(
		(state) => ({
			periode: state.periode,
			bridgeKpi: state.bridgeKpi,
		}),
		shallow
	);

	const queries = useQueries({
		queries: [
			{
				queryKey: ["employee-detail", curNipam],
				queryFn: getEmpDetails,
			},
			{
				queryKey: ["kpi.bridge", curNipam],
				queryFn: getByNipam,
				enabled: !!curNipam,
			},
			{
				queryKey: [
					"trans.kpi.staff",
					{
						nipam: curNipam,
						kpiId: bridgeKpi?.id,
						periode: periode?.periode,
					},
				],
				queryFn: getStaffKpi,
				enabled:
					periode?.periode !== undefined &&
					bridgeKpi?.id !== undefined,
			},
		],
	});

	return (
		<>
			{queries[0].isFetching ? <>Loading for data...</> : null}
			<Stack direction="column" spacing={2}>
				<EmployeeComponent />
				<KpiCard />
			</Stack>
		</>
	);
};

export default TransRoot;
