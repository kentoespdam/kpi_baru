import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const LevelTableHead = () => {
	return (
		<TableHead>
			<TableRow>
				<TableCell>No</TableCell>
				<TableCell>Level</TableCell>
				<TableCell>Status</TableCell>
				<TableCell>Action</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default LevelTableHead;
