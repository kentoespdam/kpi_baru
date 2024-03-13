import { indikatorPerilaku } from "@helper/nilaiIndikator";
import { TransPerilakuNilai } from "@myTypes/entity/trans.perilaku.nilai";
import { useCetakStore } from "@store/server/cetak";

const PagePerilakuTableBody = () => {
	const perilakuData = useCetakStore.getState().perilakuData;
	let urut = 1;

	return perilakuData === null ? null : (
		<tbody>
			{perilakuData.perilakuList.map((row: TransPerilakuNilai) => (
				<tr key={row.id}>
					<td>{urut++}</td>
					<td>{row.kompetensi}</td>
					<td>{row.uraian}</td>
					<td align="center">{indikatorPerilaku(row.nilai)}</td>
					<td align="right">{row.nilai}</td>
				</tr>
			))}
		</tbody>
	);
};

export default PagePerilakuTableBody;
