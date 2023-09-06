"use client";

import { useTransKinerjaStore } from "@store/filter/trans/kinerja";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useTransPerilakuStore } from "@store/filter/trans/perilaku";
import { useSessionStore } from "@store/main/session";
import { useQueries } from "@tanstack/react-query";
import { getByNipam } from "@utils/bridge/kpi";
import { getEmpDetails } from "@utils/eo/employee";
import { getBridgeKpi, getStaffKpi } from "@utils/trans/kpi";
import { getBridgePerilaku, getTransPerilaku } from "@utils/trans/perilaku";
import dynamic from "next/dynamic";

const Box = dynamic(() => import("@mui/material/Box"));
const Stack = dynamic(() => import("@mui/material/Stack"));
const ViewFileDialog = dynamic(() => import("./dialog/file"));
const ViewPdfDialog = dynamic(() => import("./dialog/pdf"));
const ViewUploadDialog = dynamic(() => import("./dialog/upload"));
const DetailEmployeeSkeleton = dynamic(
	() => import("./employee/detail/skeleton")
);
const BawahanComponent = dynamic(() => import("./bawahan"));
const EmployeeComponent = dynamic(() => import("./employee"));
const KpiCard = dynamic(() => import("./kpi"));

const TransRoot = () => {
	const curNipam = useSessionStore.getState().user?.userId;
	const { nipamStaff, bridgeKpiBawahan } = useTransKinerjaStore();
	const { levelStaff } = useTransPerilakuStore();
	const { periode, bridgeKpi } = useTransKpiStore();

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
				queryKey: ["trans.perilaku.bawahan.bridge", levelStaff],
				queryFn: getBridgePerilaku,
				enabled: !!levelStaff,
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
			{
				queryKey: [
					"trans.perilaku.bawahan",
					{
						nipam: nipamStaff,
						periode: periode?.periode,
						levelId: bridgeKpiBawahan?.level.id,
					},
				],
				queryFn: getTransPerilaku,
				enabled:
					!!nipamStaff && !!bridgeKpiBawahan?.level.id && !!periode,
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

				{queries[0].data?.staff ? <BawahanComponent /> : null}

				<ViewFileDialog />
				<ViewPdfDialog />
				<ViewUploadDialog />
			</Stack>
		</>
	);
};

export default TransRoot;
