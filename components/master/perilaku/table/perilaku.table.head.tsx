import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const PerilakuTableHead = () => {
	return (
		<TableHead>
			<TableRow>
				<TableCell>No</TableCell>
				<TableCell>Kompetensi</TableCell>
				<TableCell>Uraian</TableCell>
				<TableCell>Urut</TableCell>
				<TableCell>Status</TableCell>
				<TableCell>Action</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default PerilakuTableHead;
