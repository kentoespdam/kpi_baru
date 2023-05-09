import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const BridgeKpiPegawaiTableHead = () => {
	return (
		<TableHead>
			<TableRow>
				<TableCell>No</TableCell>
				<TableCell>Nipam</TableCell>
				<TableCell>Nama</TableCell>
				<TableCell>KPI</TableCell>
				<TableCell>Organization</TableCell>
				<TableCell>Position</TableCell>
				<TableCell>Status</TableCell>
				<TableCell>Action</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default BridgeKpiPegawaiTableHead;
