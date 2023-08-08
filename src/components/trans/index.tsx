"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTransKinerjaStore } from "@store/filter/trans/kinerja";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useTransPerilakuStore } from "@store/filter/trans/perilaku";
import { useSessionStore } from "@store/main/session";
import { useQueries } from "@tanstack/react-query";
import { getByNipam } from "@utils/bridge/kpi";
import { getEmpDetails } from "@utils/eo/employee";
import { getBridgeKpi, getStaffKpi } from "@utils/trans/kpi";
import { getBridgePerilaku, getTransPerilaku } from "@utils/trans/perilaku";
import BawahanComponent from "./bawahan";
import EmployeeComponent from "./employee";
import DetailEmployeeSkeleton from "./employee/detail/skeleton";
import KpiCard from "./kpi";
import ViewFileDialog from "./dialog/file";
import ViewFormKinerjaDialog from "./dialog/form/kinerja";
import ViewPdfDialog from "./dialog/pdf";
import ViewUploadDialog from "./dialog/upload";
import ViewFormPerilakuDialog from "./dialog/form/perilaku";

const TransRoot = () => {
	const curNipam = useSessionStore.getState().user?.userId;
	const { nipamStaff, bridgeKpiBawahan } = useTransKinerjaStore((state) => ({
		nipamStaff: state.nipamStaff,
		bridgeKpiBawahan: state.bridgeKpiBawahan,
	}));
	const { levelStaff, bridgePerilakuBawahan } = useTransPerilakuStore();
	const { periode, bridgeKpi } = useTransKpiStore((state) => ({
		periode: state.periode,
		bridgeKpi: state.bridgeKpi,
	}));

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

				{queries[0].data?.staff ? (
					<>
						<BawahanComponent />
						<ViewFileDialog />
						<ViewPdfDialog />
						<ViewUploadDialog />
						<ViewFormKinerjaDialog />
						<ViewFormPerilakuDialog />
					</>
				) : null}
			</Stack>
		</>
	);
};

export default TransRoot;
