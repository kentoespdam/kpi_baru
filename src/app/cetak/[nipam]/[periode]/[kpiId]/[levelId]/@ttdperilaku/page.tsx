import { tanggalSekarang } from "@helper/tanggal";
import { useCetakStore } from "@store/server/cetak";

const PageTtdPerilaku = () => {
	const biodata = useCetakStore.getState().biodata;

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "flex-end",
				marginTop: "1em",
			}}
		>
			<div
				style={{
					minWidth: 350,
					textAlign: "center",
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
				<b>{biodata?.atasan.nama}</b>
			</div>
		</div>
	);
};

export default PageTtdPerilaku;
