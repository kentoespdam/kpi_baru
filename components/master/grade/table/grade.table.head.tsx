import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const GradeTableHead = () => {
	return (
		<TableHead>
			<TableRow>
				<TableCell>No</TableCell>
				<TableCell>Grade</TableCell>
				<TableCell>Level</TableCell>
				<TableCell>Tukin</TableCell>
				<TableCell>Status</TableCell>
				<TableCell>Action</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default GradeTableHead;
