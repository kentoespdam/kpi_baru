const PageKpiTableHead = () => {
	return (
		<thead>
			<tr>
				<th rowSpan={3}>No</th>
				<th rowSpan={3}>INDIKATOR KINERJA KUNCI (KPI)</th>
				<th rowSpan={3}>PENJELASAN / RUMUSAN KPI</th>
				<th colSpan={3}>TARGET KPI</th>
				<th rowSpan={3}>BOBOT KPI</th>
				<th colSpan={3}>PENCAPAIAN/REALISASI KPI</th>
				<th colSpan={3}>NILAI KPI</th>
			</tr>
			<tr>
				<th colSpan={2}>Produk Kerja</th>
				<th rowSpan={2}>Batas Waktu Pelaksanaan/ Pelaporan</th>
				<th colSpan={2}>Produk Kerja</th>
				<th rowSpan={2}>Batas Waktu Pelaksanaan/ Pelaporan</th>
				<th>Produk Kerja</th>
				<th>Waktu</th>
				<th rowSpan={2}>Total</th>
			</tr>
			<tr>
				<th>Volume</th>
				<th>Satuan</th>
				<th>Volume</th>
				<th>Satuan</th>
				<th>Bobot = 80%</th>
				<th>Bobot = 20%</th>
			</tr>
		</thead>
	);
};

export default PageKpiTableHead;
