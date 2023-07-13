import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

type TableBodyProps = {
	colSpan?: number | 1;
	error?: boolean;
};
const TableLoading = (props: TableBodyProps) => {
	const { colSpan, error } = props;
	return (
		<TableBody>
			<TableRow>
				<TableCell colSpan={colSpan} sx={{ textAlign: "center" }}>
					{error ? "Data Not Found!" : "Loading..."}
				</TableCell>
			</TableRow>
		</TableBody>
	);
};

export default TableLoading;
