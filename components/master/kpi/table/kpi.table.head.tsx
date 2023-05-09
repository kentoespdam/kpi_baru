import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const KpiTableHead = () => {
	return (
		<TableHead>
			<TableRow>
				<TableCell>No</TableCell>
				<TableCell>KPI Name</TableCell>
				<TableCell>Organization</TableCell>
				<TableCell>Position</TableCell>
				<TableCell>Profesi</TableCell>
				<TableCell>Grade</TableCell>
				<TableCell>Status</TableCell>
				<TableCell>Action</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default KpiTableHead;
