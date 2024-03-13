import { hitungRating } from "@helper/hitung";
import { useCetakStore } from "@store/server/cetak";

const PageNilaiAkhirTableFoot = () => {
	const { kpiData, perilakuData } = useCetakStore.getState();
	const totalKinerja = kpiData ? 0.8 * kpiData.nilaiTotal : 0;
	const nilaiPerilaku = perilakuData
		? perilakuData.perilakuList.reduce((acc, cur) => acc + cur.nilai, 0) /
		  perilakuData.perilakuList.length
		: 0;
	const totalPerilaku = 0.2 * nilaiPerilaku;
	const nilaiRating = totalKinerja + totalPerilaku;
	return (
		<thead>
			<tr>
				<td colSpan={2}></td>
				<th colSpan={2} align="left">
					Total Nilai Kinerja
				</th>
				<th>{nilaiRating.toFixed(2)}</th>
			</tr>
			<tr>
				<td colSpan={2}></td>
				<th colSpan={2} align="left">
					Rating Kinerja
				</th>
				<th>{hitungRating(nilaiRating)}</th>
			</tr>
		</thead>
	);
};

export default PageNilaiAkhirTableFoot;
