import TableLoading from "@components/commons/table/loading";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { TransKpiQKeyProps } from "@myTypes/entity/trans.kpi";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import DetailKpiBawahanTableFooter from "./footer";
import DetailKpiBawahanTableHead from "./head";
const DetailKpiBawahanTableBody = dynamic(() => import("./body"));

type TransKinerjaTableProps = {
	queryKeyKpi: (string | TransKpiQKeyProps)[];
};
const TransKinerjaTable = (props: TransKinerjaTableProps) => {
	const { queryKeyKpi } = props;
	const qc = useQueryClient();
	const qStatus = qc.getQueryState(queryKeyKpi);

	return (
		<TableContainer>
			{qStatus?.fetchStatus === "fetching" ? <LinearProgress /> : null}
			<Table width="100%">
				<DetailKpiBawahanTableHead />
				{qStatus?.fetchStatus === "fetching" ? (
					<TableLoading colSpan={14} />
				) : qStatus?.data ? (
					<DetailKpiBawahanTableBody queryKeyKpi={queryKeyKpi} />
				) : (
					<TableLoading colSpan={14} error />
				)}
				<DetailKpiBawahanTableFooter />
			</Table>
		</TableContainer>
	);
};

export default TransKinerjaTable;
