import { TransIndikator } from "@myTypes/entity/trans.indikator";
import { isDecimal } from "./number";

export const hitungTotalBobot = (list?: TransIndikator[]) => {
	if (!list) return 0;
	const result = list.reduce((total, item) => {
		const totUraian = item.uraianList.reduce(
			(totalUraian, itemUraian) => totalUraian + itemUraian.bobot,
			0
		);
		return total + totUraian;
	}, 0);

	return isDecimal(result) ? Number(result.toFixed(2)) : result;
};

export const hitungTotalNilaiProdukKerja = (list?: TransIndikator[]) => {
	if (!list) return 0;
	const result = list.reduce((total, item) => {
		const totalProdukKerja = item.uraianList.reduce(
			(totalProdukKerja, itemUraian) =>
				totalProdukKerja + itemUraian.nilaiProdukKerja,
			0
		);
		return total + totalProdukKerja;
	}, 0);

	return isDecimal(result) ? Number(result.toFixed(2)) : result;
};

export const hitungTotalNilaiWaktu = (list?: TransIndikator[]) => {
	if (!list) return 0;
	const result = list.reduce((total, item) => {
		const totalNilaiWaktu = item.uraianList.reduce(
			(totalNilaiWaktu, itemUraian) =>
				totalNilaiWaktu + itemUraian.nilaiWaktu,
			0
		);
		return total + totalNilaiWaktu;
	}, 0);

	return isDecimal(result) ? Number(result.toFixed(2)) : result;
};
