import CellBuilder from "@components/commons/table/cell.builder";
import TableLoading from "@components/commons/table/loading";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import { useViewFileDialogStore } from "@store/dialog/view.file";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFiles } from "@utils/trans/file";
import TransKpiFileListItemCell from "./file.cell";
import { TransFile } from "@myTypes/entity/trans.file";

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

	return (
		<TableBody>
			{state?.data.map((item, index) => (
				<TableRow key={index}>
					<CellBuilder value={urut++} />
					<TransKpiFileListItemCell uraianFile={item} />
				</TableRow>
			))}
		</TableBody>
	);
};

export default TransKpiFileListTableBody;
