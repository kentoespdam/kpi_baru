import CellBuilder from "@components/commons/table/cell.builder";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const KpiAdminKinerjaTableHead = () => {
	return (
		<TableHead>
			<TableRow>
				<CellBuilder
					rowSpan={3}
					value="NO"
					bordered
					align="center"
					sx={{ whiteSpace: "nowrap" }}
				/>
				<CellBuilder
					rowSpan={3}
					value="INDIKATOR KINERJA KUNCI (KPI)"
					bordered
					sx={{ whiteSpace: "nowrap" }}
				/>
				<CellBuilder
					rowSpan={3}
					value="PENJELASAN / RUMUSAN KPI"
					bordered
					sx={{ whiteSpace: "nowrap" }}
				/>
				<CellBuilder
					colSpan={3}
					value="TARGET KPI"
					bordered
					align="center"
				/>
				<CellBuilder
					rowSpan={3}
					value="BOBOT KPI"
					bordered
					sx={{ textAlign: "center" }}
				/>
				<CellBuilder
					colSpan={3}
					value="PENCAPAIAN/REALISASI KPI"
					bordered
				/>
				<CellBuilder
					colSpan={3}
					value="NILAI KPI"
					bordered
					sx={{ textAlign: "center" }}
				/>
				<CellBuilder
					rowSpan={3}
					value="Action"
					bordered
					sx={{ textAlign: "center" }}
				/>
			</TableRow>
			<TableRow>
				<CellBuilder
					colSpan={2}
					value="Produk Kerja"
					bordered
					sx={{ textAlign: "center" }}
				/>
				<CellBuilder
					rowSpan={2}
					value="Batas Waktu Pelaksanaan/ Pelaporan"
					bordered
				/>
				<CellBuilder
					colSpan={2}
					value="Produk Kerja"
					bordered
					sx={{ textAlign: "center" }}
				/>
				<CellBuilder
					rowSpan={2}
					value="Batas WaktuPelaksanaan/Pelaporan"
					bordered
				/>
				<CellBuilder
					value="Produk Kerja"
					bordered
					sx={{ textAlign: "center" }}
				/>
				<CellBuilder
					value="Waktu"
					bordered
					sx={{ textAlign: "center" }}
				/>
				<CellBuilder
					rowSpan={2}
					value="Total"
					bordered
					sx={{ textAlign: "center" }}
				/>
			</TableRow>
			<TableRow>
				<CellBuilder
					value="Volume"
					bordered
					sx={{ textAlign: "center" }}
				/>
				<CellBuilder
					value="Satuan"
					bordered
					sx={{ textAlign: "center" }}
				/>
				<CellBuilder
					value="Volume"
					bordered
					sx={{ textAlign: "center" }}
				/>
				<CellBuilder
					value="Satuan"
					bordered
					sx={{ textAlign: "center" }}
				/>
				<CellBuilder
					value="Bobot = 80%"
					bordered
					sx={{ textAlign: "center" }}
				/>
				<CellBuilder
					value="Bobot = 20%"
					bordered
					sx={{ textAlign: "center" }}
				/>
			</TableRow>
		</TableHead>
	);
};

export default KpiAdminKinerjaTableHead;
