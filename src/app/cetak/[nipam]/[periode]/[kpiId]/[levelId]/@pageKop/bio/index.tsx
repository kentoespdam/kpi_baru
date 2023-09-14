import { periodeToString } from "@helper/periode";
import BioDetail from "./detail";
import { useCetakStore } from "@store/server/cetak";

const Bio = async () => {
	const { biodata, periode } = useCetakStore.getState();
	return (
		<div
			style={{
				flex: 1,
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				marginLeft: 20,
				marginRight: 20,
			}}
		>
			<div
				style={{
					width: "65%",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<BioDetail
					field="PERIODE BULAN PENILAIAN"
					value={periodeToString(periode!)}
				/>
				<BioDetail field="KARYAWAN YANG DINILAI" />
				<BioDetail field="NAMA" value={biodata?.curr.nama} />
				<BioDetail
					field="Jabatan"
					value={biodata?.curr.position.name}
				/>
				<BioDetail
					field="Unit Kerja"
					value={biodata?.curr.organization.name}
				/>
			</div>
			{biodata?.atasan ? (
				<div
					style={{
						width: "45%",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<BioDetail field="&nbsp;" />
					<BioDetail field="ATASAN" />
					<BioDetail field="Nama" value={biodata?.atasan.nama} />
					<BioDetail
						field="Jabatan"
						value={biodata?.atasan.position.name}
					/>
					<BioDetail
						field="Unit Kerja"
						value={biodata?.atasan.organization.name}
					/>
				</div>
			) : null}
		</div>
	);
};

export default Bio;
