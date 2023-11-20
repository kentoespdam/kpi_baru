import { useCetakStore } from "@store/server/cetak";

const PageNilaiAkhirTableBody = () => {
	const { kpiData, perilakuData } = useCetakStore.getState();
	const totalKinerja = kpiData ? 0.8 * kpiData.nilaiTotal : 0;
	const nilaiPerilaku = perilakuData
		? perilakuData.perilakuList.reduce((acc, cur) => acc + cur.nilai, 0) /
		  perilakuData.perilakuList.length
		: 0;
	const totalPerilaku = 0.2 * nilaiPerilaku;
	return (
		<tbody className="body-center">
			<tr>
				<td align="right">{1}</td>
				<td>KPI</td>
				<td align="center">{kpiData ? kpiData.nilaiTotal : 0}</td>
				<td align="center">80%</td>
				<td align="center">{totalKinerja.toFixed(2)}</td>
			</tr>
			<tr>
				<td align="right">2</td>
				<td>KOMPETENSI</td>
				<td align="center">
					{perilakuData ? Number(nilaiPerilaku.toFixed(2)) : 0}
				</td>
				<td align="center">20%</td>
				<td align="center">{Number(totalPerilaku.toFixed(2))}</td>
			</tr>
		</tbody>
	);
};

export default PageNilaiAkhirTableBody;
