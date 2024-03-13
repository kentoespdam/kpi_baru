const PagePerilakuTableHead = () => {
	return (
		<thead>
			<tr>
				<th rowSpan={2}>No</th>
				<th>Kompetensi</th>
				<th>Definisi</th>
				<th style={{ whiteSpace: "nowrap" }}>Indikator Perilaku</th>
				<th>Nilai</th>
			</tr>
			<tr>
				<th>(a)</th>
				<th>(b)</th>
				<th>(c)</th>
				<th>(d)</th>
			</tr>
		</thead>
	);
};

export default PagePerilakuTableHead;
