export const hitungNilaiProdukKerja = (
	capaianVolume: number,
	volume: number,
	satuan: string,
	bobot: number,
	waktu: string,
	target: string
) => {
	let hitung = 0;
	if (satuan.toLowerCase() === "dokumen") {
		if (capaianVolume >= volume) hitung = bobot;
		else hitung = (capaianVolume / volume) * bobot;
	} else {
		if (capaianVolume >= volume) hitung = bobot;
		else
			hitung =
				target === "MIN"
					? (capaianVolume / volume) * bobot
					: (volume / capaianVolume) * bobot;
	}
	const nilai = waktu === "Akhir Bulan" ? hitung : hitung * 0.8;
	return nilai;
};

export const hitungNilaiWaktu = (
	capaianVolume: number,
	capaianWaktu: string,
	waktu: string,
	periode: string
) => {
	if (waktu === "Akhir Bulan") return 0;
	if (capaianVolume <= 0) return 0;

	let waktuTime: number;
	const th = periode.substring(0, 4);
	const bln = parseInt(periode.substring(4));
	if (waktu.includes("Tanggal")) {
		const tglStr = waktu.replace("Tanggal", "").trim();
		waktuTime = new Date(`${th}-${bln + 1}-${tglStr} 00:00:00`).getTime();
	} else {
		waktuTime = new Date(waktu).getTime();
	}
	const capWaktuTime = new Date(`${capaianWaktu} 00:00:00`).getTime();
	const selisih = capWaktuTime - waktuTime;
	const selisihHari = selisih / (1000 * 3600 * 24);
	if (selisihHari >= 5) return 0;
	if (selisihHari <= -5) return 1.5;
	const nilaiWaktu = 1 - selisihHari * 0.1;
	return nilaiWaktu;
};

export const hitungNilaiTotalUraian = (
	nilaiProdukKerja: number,
	nilaiWaktu: number
) => {
	const nilaiTotal = nilaiProdukKerja + nilaiWaktu;
	return nilaiTotal;
};

export const hitungRating = (nilai: number) => {
	return nilai < 70 ? "D" : nilai < 100 ? "C" : nilai < 130 ? "B" : "A";
};
