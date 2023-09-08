import TableLoading from "@components/commons/table/loading";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { useTransKinerjaStore } from "@store/filter/trans/kinerja";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import DetailKpiBawahanTableFooter from "./footer";
import DetailKpiBawahanTableHead from "./head";
const DetailKpiBawahanTableBody = dynamic(() => import("./body"));

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
			{qStatus?.fetchStatus === "fetching" ? <LinearProgress /> : null}
			<Table width="100%">
				<DetailKpiBawahanTableHead />
				{qStatus?.fetchStatus === "fetching" ? (
					<TableLoading colSpan={14} />
				) : qStatus?.data ? (
					<DetailKpiBawahanTableBody />
				) : (
					<TableLoading colSpan={14} error />
				)}
				<DetailKpiBawahanTableFooter />
			</Table>
		</TableContainer>
	);
};

export default TransKinerjaTable;
