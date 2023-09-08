import TableLoading from "@components/commons/table/loading";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { useTransKinerjaStore } from "@store/filter/trans/kinerja";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useTransPerilakuStore } from "@store/filter/trans/perilaku";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import TransPerilakuTableFooter from "./footer";
import TransPerilakuTableHead from "./head";
const TransPerilakuTableBody = dynamic(() => import("./body"));

const TransPerilakuTable = () => {
	const periode = useTransKpiStore((state) => state.periode);
	const nipamStaff = useTransKinerjaStore((state) => state.nipamStaff);
	const levelStaff = useTransPerilakuStore((state) => state.levelStaff);

	const qc = useQueryClient();
	const qStatus = qc.getQueryState([
		"trans.perilaku.bawahan",
		{
			nipam: nipamStaff,
			periode: periode?.periode,
			levelId: levelStaff,
		},
	]);

	return (
		<TableContainer>
			{qStatus?.status === "loading" ||
			qStatus?.fetchStatus === "fetching" ? (
				<LinearProgress />
			) : null}
			<Table>
				<TransPerilakuTableHead />
				{qStatus?.status === "loading" ||
				qStatus?.fetchStatus === "fetching" ? (
					<TableLoading colSpan={5} />
				) : qStatus?.error ? (
					<TableLoading colSpan={5} error />
				) : (
					<TransPerilakuTableBody />
				)}
				<TransPerilakuTableFooter />
			</Table>
		</TableContainer>
	);
};

export default TransPerilakuTable;
