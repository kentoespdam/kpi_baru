import { TransFile } from "@myTypes/entity/trans.file";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const TableLoading = dynamic(() => import("@components/commons/table/loading"));
const TableBody = dynamic(() => import("@mui/material/TableBody"));
const TransKpiFileListItemCell = dynamic(() => import("./file.cell"));
const TableRow = dynamic(() => import("@mui/material/TableRow"));
const CellBuilder = dynamic(
	() => import("@components/commons/table/cell.builder")
);

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
				<TableRow hover key={index}>
					<CellBuilder value={urut++} />
					<TransKpiFileListItemCell
						uraianId={uraianId}
						uraianFile={item}
					/>
				</TableRow>
			))}
		</TableBody>
	);
};

export default TransKpiFileListTableBody;
