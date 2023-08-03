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
	const idUraian = useViewFileDialogStore.getState().idUraian;
	const { isFetching, data, error } = useQuery<TransFile[]>({
		queryKey: ["trans.file.los", Number(idUraian)],
		queryFn: getFiles,
		enabled: !!idUraian,
	});

	if (!data) return <TableLoading colSpan={2} error />;
	let urut = 1;
	return isFetching ? (
		<TableLoading colSpan={2} />
	) : error ? (
		<TableLoading colSpan={2} error />
	) : (
		<TableBody>
			{data.map((item, index) => (
				<TableRow key={index}>
					<CellBuilder value={urut++} />
					<TransKpiFileListItemCell uraianFile={item} />
				</TableRow>
			))}
		</TableBody>
	);
};

export default TransKpiFileListTableBody;
