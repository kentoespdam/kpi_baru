import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const BridgeLevelPerilakuTableHead = () => {
	return (
		<TableHead>
			<TableRow>
				<TableCell>No</TableCell>
				<TableCell>Level</TableCell>
				<TableCell>Perilaku</TableCell>
				<TableCell>Status</TableCell>
				<TableCell>Action</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default BridgeLevelPerilakuTableHead;
