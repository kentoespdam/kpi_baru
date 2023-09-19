import CellBuilder from "@components/commons/table/cell.builder";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const TransKpiFileListTableHead = () => {
	return (
		<TableHead>
			<TableRow>
				<CellBuilder bordered value="No" sx={{ maxWidth: 10 }} />
				<CellBuilder bordered value="File Name" />
			</TableRow>
		</TableHead>
	);
};

export default TransKpiFileListTableHead;
