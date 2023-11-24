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
import { TransKpiQKeyProps } from "@myTypes/entity/trans.kpi";
import { TransPerilakuQKeyProps } from "@myTypes/entity/trans.perilaku";
const TransPerilakuTableBody = dynamic(() => import("./body"));

type TransPerilakuTableProps = {
	queryKeyKpi: (string | TransKpiQKeyProps)[];
	queryKeyPerilaku: (string | TransPerilakuQKeyProps)[];
};
const TransPerilakuTable = (props: TransPerilakuTableProps) => {
	const qc = useQueryClient();
	const qStatus = qc.getQueryState(props.queryKeyPerilaku);

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
					<TransPerilakuTableBody
						queryKeyKpi={props.queryKeyKpi}
						queryKey={props.queryKeyPerilaku}
					/>
				)}
				<TransPerilakuTableFooter queryKey={props.queryKeyPerilaku} />
			</Table>
		</TableContainer>
	);
};

export default TransPerilakuTable;
