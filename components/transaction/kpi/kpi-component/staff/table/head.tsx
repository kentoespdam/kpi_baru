import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const KpiStaffTableHead = () => {
	return (
		<TableHead>
			<TableRow>
				<TableCell>NO</TableCell>
				<TableCell>INDIKATOR KINERJA KUNCI (KPI)</TableCell>
				<TableCell>PENJELASAN / RUMUSAN KPI</TableCell>
				<TableCell>STATUS</TableCell>
				<TableCell>ACTION</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default KpiStaffTableHead;
