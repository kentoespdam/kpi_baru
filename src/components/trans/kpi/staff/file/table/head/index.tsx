import dynamic from "next/dynamic";

const CellBuilder = dynamic(
	() => import("@components/commons/table/cell.builder")
);
const TableHead = dynamic(() => import("@mui/material/TableHead"));
const TableRow = dynamic(() => import("@mui/material/TableRow"));

const TransKpiFileListTableHead = () => {
	return (
		<TableHead>
			<TableRow>
				<CellBuilder value="No" />
				<CellBuilder value="File Name" />
			</TableRow>
		</TableHead>
	);
};

export default TransKpiFileListTableHead;
