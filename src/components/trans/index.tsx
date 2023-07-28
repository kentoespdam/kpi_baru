"use client";

import Stack from "@mui/material/Stack";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useSessionStore } from "@store/main/session";
import { useQueries } from "@tanstack/react-query";
import { getByNipam } from "@utils/bridge/kpi";
import { getEmpDetails } from "@utils/eo/employee";
import { getStaffKpi } from "@utils/trans/kpi";
import { shallow } from "zustand/shallow";
import EmployeeComponent from "./employee";
import KpiCard from "./kpi";
import DetailEmployeeSkeleton from "./employee/detail/skeleton";
import TransKpiSkeleton from "./kpi/skeleton";

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
			<Stack direction="column" spacing={2}>
				{queries[0].isFetching ? (
					<DetailEmployeeSkeleton />
				) : (
					<EmployeeComponent />
				)}
				{queries[1].isFetching ? <TransKpiSkeleton /> : <KpiCard />}
			</Stack>
		</>
	);
};

export default TransRoot;
