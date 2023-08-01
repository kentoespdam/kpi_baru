import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { useTheme } from "@mui/material/styles";
import KpiStaffTableBody from "./body";
import KpiStaffTableHead from "./head";
import { useQueryClient } from "@tanstack/react-query";
import { useSessionStore } from "@store/main/session";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { shallow } from "zustand/shallow";
import LinearProgress from "@mui/material/LinearProgress";
import TableLoading from "@components/commons/table/loading";

const KpiStaffTable = () => {
	const theme = useTheme();
	const curNipam = useSessionStore.getState().user?.userId;
	const { periode, bridgeKpi } = useTransKpiStore(
		(state) => ({
			periode: state.periode,
			bridgeKpi: state.bridgeKpi,
		}),
		shallow
	);
	const qc = useQueryClient();
	const qStatus = qc.getQueryState([
		"trans.kpi.staff",
		{
			nipam: curNipam,
			kpiId: bridgeKpi?.id,
			periode: periode?.periode,
		},
	]);

	return (
		<TableContainer>
			{qStatus?.status === "loading" ||
			qStatus?.fetchStatus === "fetching" ? (
				<LinearProgress sx={{ mb: 1 }} />
			) : null}
			<Table sx={{ border: `solid 1px ${theme.palette.divider}` }}>
				<KpiStaffTableHead />
				{qStatus?.status === "loading" ? (
					<TableLoading colSpan={5} />
				) : qStatus?.status === "error" ? (
					<TableLoading colSpan={5} error />
				) : (
					<KpiStaffTableBody />
				)}
			</Table>
		</TableContainer>
	);
};

export default KpiStaffTable;
