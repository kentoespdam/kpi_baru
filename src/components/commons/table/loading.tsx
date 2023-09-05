import dynamic from "next/dynamic";

const TableBody = dynamic(() => import("@mui/material/TableBody"));
const TableCell = dynamic(() => import("@mui/material/TableCell"));
const TableRow = dynamic(() => import("@mui/material/TableRow"));

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
