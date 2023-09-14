import {
	hitungTotalBobot,
	hitungTotalNilaiProdukKerja,
	hitungTotalNilaiWaktu,
} from "@helper/nilaiKinerja";
import { useCetakStore } from "@store/server/cetak";

const PageKpiTableFooter = () => {
	const kpiData = useCetakStore.getState().kpiData;
	return (
		<thead>
			<tr>
				<th colSpan={6}>TOTAL</th>
				<th>{hitungTotalBobot(kpiData!.indikatorList)}</th>
				<th colSpan={3}>&nbsp;</th>
				<th>{hitungTotalNilaiProdukKerja(kpiData!.indikatorList)}</th>
				<th>{hitungTotalNilaiWaktu(kpiData!.indikatorList)}</th>
				<th>{kpiData?.nilaiTotal}</th>
			</tr>
		</thead>
	);
};

export default PageKpiTableFooter;
