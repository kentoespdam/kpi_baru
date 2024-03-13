import { TransPerilakuNilai } from "@myTypes/entity/trans.perilaku.nilai";

export const indikatorPerilaku = (nilai: number) => {
	switch (true) {
		case nilai >= 0 && nilai <= 50:
			return "Sangat Kurang";
		case nilai >= 51 && nilai <= 60:
			return "Kurang";
		case nilai >= 61 && nilai <= 75:
			return "Cukup";
		case nilai >= 76 && nilai <= 90:
			return "Baik";
		case nilai >= 91 && nilai <= 100:
			return "Sangat Baik";
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
