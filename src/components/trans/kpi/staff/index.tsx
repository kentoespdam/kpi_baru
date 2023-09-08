import TableLoading from "@components/commons/table/loading";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { useTheme } from "@mui/material/styles";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useSessionStore } from "@store/main/session";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import KpiStaffTableHead from "./table/head";

const KpiStaffTableBody = dynamic(() => import("./table/body"));

const KpiStaffComponents = () => {
	const theme = useTheme();
	const curNipam = useSessionStore.getState().user?.userId;
	const { periode, bridgeKpi } = useTransKpiStore((state) => ({
		periode: state.periode,
		bridgeKpi: state.bridgeKpi,
	}));
	const qc = useQueryClient();
	const state = qc.getQueryState([
		"trans.kpi.staff",
		{
			nipam: curNipam,
			kpiId: bridgeKpi?.kpi.id,
			periode: periode?.periode,
		},
	]);

	return (
		<TableContainer>
			{state?.fetchStatus === "fetching" ? (
				<LinearProgress sx={{ mb: 1 }} />
			) : null}
			<Table sx={{ border: `solid 1px ${theme.palette.divider}` }}>
				<KpiStaffTableHead />
				{state?.fetchStatus === "fetching" ? (
					<TableLoading colSpan={5} />
				) : state?.error ? (
					<TableLoading colSpan={5} error />
				) : (
					<KpiStaffTableBody />
				)}
			</Table>
		</TableContainer>
	);
};

export default KpiStaffComponents;
