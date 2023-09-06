import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useTransKinerjaStore } from "@store/filter/trans/kinerja";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const TableLoading = dynamic(() => import("@components/commons/table/loading"));
const LinearProgress = dynamic(() => import("@mui/material/LinearProgress"));
const Table = dynamic(() => import("@mui/material/Table"));
const TableContainer = dynamic(() => import("@mui/material/TableContainer"));
const DetailKpiBawahanTableHead = dynamic(() => import("./head"));
const DetailKpiBawahanTableFooter = dynamic(() => import("./footer"));
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
