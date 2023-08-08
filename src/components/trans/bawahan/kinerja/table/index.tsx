import TableLoading from "@components/commons/table/loading";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import DetailKpiBawahanTableHead from "./head";
import DetailKpiBawahanTableFooter from "./footer";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useTransKinerjaStore } from "@store/filter/trans/kinerja";
import { useQueryClient } from "@tanstack/react-query";
import DetailKpiBawahanTableBody from "./body";

const TransKinerjaTable = () => {
	const periode = useTransKpiStore((state) => state.periode);
	const { nipamStaff, bridgeKpiBawahan } = useTransKinerjaStore();
	const qc = useQueryClient();
	const qStatus = qc.getQueryState([
		"trans.kpi.bawahan",
		{
			nipam: nipamStaff,
			kpiId: bridgeKpiBawahan?.kpi.id,
			periode: periode?.periode,
		},
	]);

	return (
		<TableContainer>
			{qStatus?.status === "loading" ||
			qStatus?.fetchStatus === "fetching" ? (
				<LinearProgress />
			) : null}
			<Table width="100%">
				<DetailKpiBawahanTableHead />
				{qStatus?.status === "loading" ||
				qStatus?.fetchStatus === "fetching" ? (
					<TableLoading colSpan={10} />
				) : (
					<DetailKpiBawahanTableBody />
				)}
				<DetailKpiBawahanTableFooter />
			</Table>
		</TableContainer>
	);
};

export default TransKinerjaTable;
