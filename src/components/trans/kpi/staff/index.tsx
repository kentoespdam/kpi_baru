import TableContainer from "@mui/material/TableContainer";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import KpiStaffTableHead from "./table/head";
import TableLoading from "@components/commons/table/loading";
import KpiStaffTableBody from "./table/body";
import { useTheme } from "@mui/material/styles";
import { useSessionStore } from "@store/main/session";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { shallow } from "zustand/shallow";
import { useQueryClient } from "@tanstack/react-query";

const KpiStaffComponents = () => {
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
	const state = qc.getQueryState([
		"trans.kpi.staff",
		{
			nipam: curNipam,
			kpiId: bridgeKpi?.kpi.id,
			periode: periode?.periode,
		},
	]);
	console.log(state);

	return (
		<TableContainer>
			{qc.isFetching() ? <LinearProgress sx={{ mb: 1 }} /> : null}
			<Table sx={{ border: `solid 1px ${theme.palette.divider}` }}>
				<KpiStaffTableHead />
				<KpiStaffTableBody />
			</Table>
		</TableContainer>
	);
};

export default KpiStaffComponents;
