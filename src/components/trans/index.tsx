"use client";
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
import dynamic from "next/dynamic";
import EmployeeComponent from "./employee";
import DetailEmployeeSkeleton from "./employee/detail/skeleton";
import KpiCard from "./kpi";
const BawahanComponent = dynamic(() => import("./bawahan"));
const ViewFileDialog = dynamic(() => import("./dialog/file"));
const ViewPdfDialog = dynamic(() => import("./dialog/pdf"));
const ViewUploadDialog = dynamic(() => import("./dialog/upload"));

const TransRoot = () => {
	const curNipam = useSessionStore.getState().user?.userId;
	const { nipamStaff, bridgeKpiBawahan } = useTransKinerjaStore();
	const { levelStaff } = useTransPerilakuStore();
	const { periode, bridgeKpi } = useTransKpiStore();

	const qKeyBridge = ["kpi.bridge", curNipam];
	const qKeyKpiStaff = [
		"trans.kpi.staff",
		{
			nipam: curNipam,
			kpiId: bridgeKpi?.kpi.id,
			periode: periode?.periode,
		},
	];
	const qKeyDetEmp = ["employee-detail", curNipam];
	const qKeyKpiBawahanBridge = ["trans.kpi.bawahan.bridge", nipamStaff];
	const qKeyPerilakuBawahanBridge = [
		"trans.perilaku.bawahan.bridge",
		levelStaff,
	];
	const qKeyTransKpiBawahan = [
		"trans.kpi.bawahan",
		{
			nipam: nipamStaff,
			kpiId: bridgeKpiBawahan?.kpi.id,
			periode: periode?.periode,
		},
	];
	const qKeyTransPerilakuBawahan = [
		"trans.perilaku.bawahan",
		{
			nipam: nipamStaff,
			periode: periode?.periode,
			levelId: bridgeKpiBawahan?.level.id,
		},
	];

	const queries = useQueries({
		queries: [
			{
				queryKey: qKeyBridge,
				queryFn: getByNipam,
				enabled: !!curNipam,
			},
			{
				queryKey: qKeyKpiStaff,
				queryFn: getStaffKpi,
				enabled:
					periode?.periode !== undefined &&
					bridgeKpi?.id !== undefined,
			},
			{
				queryKey: qKeyDetEmp,
				queryFn: getEmpDetails,
			},
			{
				queryKey: qKeyKpiBawahanBridge,
				queryFn: getBridgeKpi,
				enabled: !!nipamStaff,
				retry: 2,
			},
			{
				queryKey: qKeyPerilakuBawahanBridge,
				queryFn: getBridgePerilaku,
				enabled: !!levelStaff,
				retry: 2,
				cacheTime: 0,
			},
			{
				queryKey: qKeyTransKpiBawahan,
				queryFn: getStaffKpi,
				enabled:
					!!nipamStaff && !!bridgeKpiBawahan?.kpi.id && !!periode,
				cacheTime: 0,
			},
			{
				queryKey: qKeyTransPerilakuBawahan,
				queryFn: getTransPerilaku,
				enabled:
					!!nipamStaff && !!bridgeKpiBawahan?.level.id && !!periode,
				cacheTime: 0,
			},
		],
	});

	return (
		<Stack direction="column" spacing={2}>
			{queries[0].isFetching || queries[0].isLoading ? (
				<DetailEmployeeSkeleton />
			) : (
				<EmployeeComponent />
			)}
			<KpiCard />

			{queries[2].data?.staff ? <BawahanComponent /> : null}

			<ViewFileDialog />
			<ViewPdfDialog />
			<ViewUploadDialog />
		</Stack>
	);
};

export default TransRoot;
