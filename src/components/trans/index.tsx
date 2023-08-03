"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useSessionStore } from "@store/main/session";
import { useQueries } from "@tanstack/react-query";
import { getByNipam } from "@utils/bridge/kpi";
import { getEmpDetails } from "@utils/eo/employee";
import { getBridgeKpi, getStaffKpi } from "@utils/trans/kpi";
import { shallow } from "zustand/shallow";
import EmployeeComponent from "./employee";
import DetailEmployeeSkeleton from "./employee/detail/skeleton";
import KpiCard from "./kpi";
import KpiBawahanComponent from "./kpi/bawahan";
import { useTransKpiBawahanStore } from "@store/filter/trans/bawahan";

const TransRoot = () => {
	const curNipam = useSessionStore.getState().user?.userId;
	const { nipamStaff, bridgeKpiBawahan } = useTransKpiBawahanStore(
		(state) => ({
			nipamStaff: state.nipamStaff,
			bridgeKpiBawahan: state.bridgeKpiBawahan,
		}),
		shallow
	);
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
						kpiId: bridgeKpi?.kpi.id,
						periode: periode?.periode,
					},
				],
				queryFn: getStaffKpi,
				enabled:
					periode?.periode !== undefined &&
					bridgeKpi?.id !== undefined,
			},
			{
				queryKey: ["trans.kpi.bawahan.bridge", nipamStaff],
				queryFn: getBridgeKpi,
				enabled: !!nipamStaff,
				retry: 2,
			},
			{
				queryKey: [
					"trans.kpi.bawahan",
					{
						nipam: nipamStaff,
						kpiId: bridgeKpiBawahan?.kpi.id,
						periode: periode?.periode,
					},
				],
				queryFn: getStaffKpi,
				enabled:
					!!nipamStaff && !!bridgeKpiBawahan?.kpi.id && !!periode,
			},
		],
	});

	return (
		<>
			<Stack direction="column" spacing={2}>
				<Box>
					{queries[0].isFetching ? (
						<DetailEmployeeSkeleton />
					) : (
						<EmployeeComponent />
					)}
				</Box>

				<KpiCard />

				{queries[0].data?.staff ? <KpiBawahanComponent /> : null}
			</Stack>
		</>
	);
};

export default TransRoot;
