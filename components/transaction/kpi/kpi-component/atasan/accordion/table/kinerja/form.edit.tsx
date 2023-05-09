import WaktuAutocompleteComponent from "@commons/components/autocomplete/waktu";
import { IKpiUraianPost } from "@interfaces/ITransKpiPegawai";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import {
	updateTransUraianHandler,
	useTransUraianStore,
} from "@storage/transaction/atasan/trans.uraian.store";
import { useTransactionKpiStore } from "@storage/transaction/kpi.store";
import React from "react";
import { shallow } from "zustand/shallow";

function hitungNilaiProdukKerja(
	capaianVolume: number,
	volume: number,
	satuan: string,
	bobot: number,
	waktu: string
) {
	let hitung = 0;
	if (satuan === "dokumen") {
		if (capaianVolume >= volume) hitung = bobot;
	} else {
		hitung = (capaianVolume / volume) * bobot;
	}
	const nilai = waktu === "Akhir Bulan" ? hitung : hitung * 0.8;
	return nilai;
}

function hitungNilaiWaktu(
	capaianVolume: number,
	capaianWaktu: string,
	waktu: string,
	bobot: number,
	periode: string
) {
	if (waktu === "Akhir Bulan") return 0;
	if (capaianVolume <= 0) return 0;
	const th = periode.substring(0, 4);
	const bln = periode.substring(4);
	const tglStr = waktu.replace("Tanggal", "").trim();
	const capTglStr = capaianWaktu.replace("Tanggal", "").trim();
	const waktuTime = new Date(`${th}-${bln}-${tglStr}`).getTime();
	const capWaktuTime = new Date(`${th}-${bln}-${capTglStr}`).getTime();
	const selisih = capWaktuTime - waktuTime;
	const selisihHari = selisih / (1000 * 3600 * 24);
	if (selisihHari > 5) return 0;
	if (selisihHari < -5) return 1.5;
	const nilaiWaktu = 1 - selisihHari * 0.1;
	return nilaiWaktu;
}

function hitungNilaiTotalUraian(nilaiProdukKerja: number, nilaiWaktu: number) {
	const nilaiTotal = nilaiProdukKerja + nilaiWaktu;
	return nilaiTotal;
}

const KpiStaffForm = () => {
	const capaianVolumeRef = React.useRef<HTMLInputElement>(null);
	const uraian = useTransUraianStore((state) => state.uraian, shallow);
	const { periode, setPeriode } = useTransactionKpiStore(
		(state) => ({ periode: state.periode, setPeriode: state.setPeriode }),
		shallow
	);
	const openNotif = useNotifSnackbarStore(
		(state) => state.openNotif,
		shallow
	);
	const toggleDialog = useFormDialogStore((state) => state.toggleDialog);

	const [waktu, setWaktu] = React.useState<string | null | undefined>(
		uraian?.capaianWaktu ?? "Akhir Bulan"
	);

	function setSearchWaktu(value?: string | null) {
		setWaktu(value);
	}

	function cancelHandler() {
		toggleDialog();
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!uraian) return;

		const nilaiProdukKerja = hitungNilaiProdukKerja(
			Number(capaianVolumeRef.current?.value),
			uraian.volume,
			uraian.satuan,
			uraian.bobot,
			uraian.waktu
		);
		const nilaiWaktu = hitungNilaiWaktu(
			Number(capaianVolumeRef.current?.value),
			String(waktu),
			uraian.waktu,
			uraian.bobot,
			String(periode)
		);
		const nilaiTotalUraian = hitungNilaiTotalUraian(
			nilaiProdukKerja,
			nilaiWaktu
		);
		const form: IKpiUraianPost = {
			id: uraian?.id,
			capaianVolume: Number(capaianVolumeRef.current?.value),
			capaianSatuan: uraian?.capaianSatuan,
			capaianWaktu: waktu,
			nilaiProdukKerja: nilaiProdukKerja,
			nilaiWaktu: nilaiWaktu,
			nilaiTotalUraian: nilaiTotalUraian,
			status: uraian?.status,
		};

		await updateTransUraianHandler(openNotif, toggleDialog, form);
		setPeriode();
		setTimeout(() => setPeriode(periode), 100);
	}

	return (
		<DialogContent>
			<Stack
				spacing={2}
				sx={{ mt: 1 }}
				component="form"
				onSubmit={handleSubmit}
			>
				<FormControl fullWidth>
					<TextField
						id="capaianVolume"
						name="capaianVolume"
						label="Capaian Volume"
						type="number"
						size="small"
						inputRef={capaianVolumeRef}
						sx={{ minWidth: 100 }}
						defaultValue={uraian?.capaianVolume}
					/>
				</FormControl>
				<FormControl fullWidth>
					<WaktuAutocompleteComponent
						search={waktu}
						setSearchValue={setSearchWaktu}
						size="small"
					/>
				</FormControl>

				<Stack direction="row" spacing={2} justifyContent="flex-end">
					<Button
						variant="contained"
						color="error"
						onClick={cancelHandler}
					>
						CANCEL
					</Button>
					<Button variant="contained" color="primary" type="submit">
						SAVE
					</Button>
				</Stack>
			</Stack>
		</DialogContent>
	);
};

export default KpiStaffForm;
