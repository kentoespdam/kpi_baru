import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const UraianIndikatorTableHead = () => {
	return (
		<TableHead>
			<TableRow>
				<TableCell>No</TableCell>
				<TableCell>KPI</TableCell>
				<TableCell>Indikator</TableCell>
				<TableCell>Uraian Indikator</TableCell>
				<TableCell>Volume</TableCell>
				<TableCell>Satuan</TableCell>
				<TableCell>Waktu</TableCell>
				<TableCell>Bobot</TableCell>
				<TableCell>Status</TableCell>
				<TableCell>Action</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default UraianIndikatorTableHead;
