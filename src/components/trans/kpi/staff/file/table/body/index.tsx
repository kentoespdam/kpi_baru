import CellBuilder from "@components/commons/table/cell.builder";
import TableLoading from "@components/commons/table/loading";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import { TransFile } from "@myTypes/entity/trans.file";
import { useQueryClient } from "@tanstack/react-query";
import TransFileListItem from "../../item";

type TransKpiFileListTableBodyProps = {
	uraianId: number;
};
const TransKpiFileListTableBody = (props: TransKpiFileListTableBodyProps) => {
	const { uraianId } = props;
	const qc = useQueryClient();
	const state = qc.getQueryState<TransFile[]>([
		"trans.file.list",
		Number(uraianId),
	]);

	if (state?.fetchStatus === "fetching" || state?.status === "loading")
		return <TableLoading colSpan={2} />;
	if (state?.error) return <TableLoading colSpan={2} error />;

	if (!state?.data) return <TableLoading colSpan={2} error />;
	let urut = 1;

	// return (
	// 	<TableBody>
	// 		{state?.data.map((item, index) => (
	// 			<TableRow hover key={index}>
	// 				<CellBuilder
	// 					bordered
	// 					value={urut++}
	// 				/>
	// 				<TransKpiFileListItemCell
	// 					uraianId={uraianId}
	// 					uraianFile={item}
	// 				/>
	// 			</TableRow>
	// 		))}
	// 	</TableBody>
	// );

	return state.data.map((item, index) => (
		<TransFileListItem
			key={index}
			uraianId={uraianId}
			uraianFile={item}
		/>
	));
};

export default TransKpiFileListTableBody;
