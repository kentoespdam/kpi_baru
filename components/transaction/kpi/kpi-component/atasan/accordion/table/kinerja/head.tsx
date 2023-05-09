import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const KpiStaffTableHead = () => {
	return (
		<TableHead>
			<TableRow>
				<TableCell rowSpan={3}>NO</TableCell>
				<TableCell rowSpan={3}>INDIKATOR KINERJA KUNCI (KPI)</TableCell>
				<TableCell rowSpan={3}>PENJELASAN / RUMUSAN KPI</TableCell>
				<TableCell colSpan={3}>TARGET KPI</TableCell>
				<TableCell rowSpan={3}>BOBOT KPI</TableCell>
				<TableCell colSpan={3}>PENCAPAIAN/REALISASI KPI</TableCell>
				<TableCell colSpan={3}>NILAI KPI</TableCell>
				<TableCell rowSpan={3}>Action</TableCell>
			</TableRow>
			<TableRow>
				<TableCell colSpan={2}>Produk Kerja</TableCell>
				<TableCell rowSpan={2}>
					Batas Waktu <br />
					Pelaksanaan/ <br />
					Pelaporan
				</TableCell>
				<TableCell colSpan={2}>Produk Kerja</TableCell>
				<TableCell rowSpan={2}>
					Batas Waktu <br />
					Pelaksanaan/ <br />
					Pelaporan
				</TableCell>
				<TableCell>Produk Kerja</TableCell>
				<TableCell>Waktu</TableCell>
				<TableCell rowSpan={2}>Total</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>Volume</TableCell>
				<TableCell>Satuan</TableCell>
				<TableCell>Volume</TableCell>
				<TableCell>Satuan</TableCell>
				<TableCell>Bobot = 80%</TableCell>
				<TableCell>Bobot = 20%</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default KpiStaffTableHead;
