import { TransPerilakuNilai } from "@myTypes/entity/trans.perilaku.nilai";

export const indikatorPerilaku = (nilai: number) => {
	switch (true) {
		case nilai >= 0 && nilai <= 50:
			return "sangat kurang";
		case nilai >= 51 && nilai <= 60:
			return "kurang";
		case nilai >= 61 && nilai <= 75:
			return "cukup";
		case nilai >= 76 && nilai <= 90:
			return "baik";
		case nilai >= 91 && nilai <= 100:
			return "baik sekali";
		default:
			return "Belum ada penilaian";
	}
};

export const hitungTotalNilaiPerilaku = (list: TransPerilakuNilai[]) => {
	const size = list.length;
	const sum = list.reduce((result, item) => {
		return result + item.nilai;
	}, 0);
	const avg = sum / size;

	return avg.toFixed(2);
};
