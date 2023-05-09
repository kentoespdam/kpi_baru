import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";

type TableLoadingProps = {
	colSpan: number;
	message?: string;
};

const TableLoading = ({ colSpan, message }: TableLoadingProps) => {
	return (
		<TableBody>
			<TableRow>
				<TableCell colSpan={colSpan} align="center">
					{message === undefined ? (
						<CircularProgress color="inherit" size={32} />
					) : (
						message
					)}
				</TableCell>
			</TableRow>
		</TableBody>
	);
};

export default TableLoading;
