import { hitungTotalNilaiPerilaku } from "@helper/nilaiIndikator";
import { useCetakStore } from "@store/server/cetak";

const PagePerilakuTableFooter = () => {
	const perilakuData = useCetakStore.getState().perilakuData;
	return (
		<thead>
			<tr>
				<th colSpan={4}>TOTAL NILAI PERILAKU</th>
				<th>
					{perilakuData === null
						? 0
						: hitungTotalNilaiPerilaku(perilakuData.perilakuList)}
				</th>
			</tr>
		</thead>
	);
};

export default PagePerilakuTableFooter;
