import { tanggalSekarang } from "@helper/tanggal";
import { useCetakStore } from "@store/server/cetak";

const PageTtdKpi = async () => {
	const biodata = useCetakStore.getState().biodata;

	return (
		<>
			<center>
				<h4 style={{ marginBottom: 0, paddingBottom: ".5em" }}>
					PERSETUJUAN PENILAIAN KPI
				</h4>
			</center>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<div
					style={{
						flex: 1,
						textAlign: "center",
						fontStyle: "italic",
						fontWeight: "bold",
					}}
				>
					<br />
					Karyawan yang dinilai
					<br />
					{biodata?.curr.position.name}
					<br />
					<br />
					ttd.
					<br />
					<br />
					{biodata?.curr.nama}
				</div>
				<div
					style={{
						flex: 1,
						textAlign: "center",
						fontStyle: "italic",
						fontWeight: "bold",
					}}
				>
					Purwokerto, {tanggalSekarang()}
					<br />
					Perumda Air Minum Tirta Satria
					<br />
					{biodata?.atasan.position.name}
					<br />
					<br />
					ttd.
					<br />
					<br />
					{biodata?.atasan.nama}
				</div>
			</div>
		</>
	);
};

export default PageTtdKpi;
