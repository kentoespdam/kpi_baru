import {
	hitungNilaiProdukKerja,
	hitungNilaiTotalUraian,
	hitungNilaiWaktu,
} from "@helper/hitung";
import { Periode } from "@helper/periode";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { TransUraian, TransUraianData } from "@myTypes/entity/trans.uraian";
import { AUDIT_STATUS } from "@myTypes/index";
import { useViewFormKinerjaDialogStore } from "@store/dialog/view.form.kinerja";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doSave, getById } from "@utils/trans/uraian";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
import React from "react";
import { TanggalComponent } from "./tanggal.component";
const DoDisturbIcon = dynamic(() => import("@mui/icons-material/DoDisturb"));
const SaveIcon = dynamic(() => import("@mui/icons-material/Save"));

type KpiKinerjaFormProps = {
	staffNipam: string;
	idKpi: number;
	idUraian: number;
	periode: Periode | null;
	isAdmin?: boolean;
};
const KpiKinerjaForm = (props: KpiKinerjaFormProps) => {
	const { staffNipam, idKpi, idUraian, periode, isAdmin } = props;
	const {
		toggleFormKinerjaOpen: toggleFormOpen,

		reset,
	} = useViewFormKinerjaDialogStore();
	const waktuRef = React.useRef<HTMLInputElement>(null);
	const { enqueueSnackbar } = useSnackbar();
	const qc = useQueryClient();
	const capaianVolumeRef = React.useRef<HTMLInputElement>(null);
	const [tarWaktu, setTarWaktu] = React.useState<string | undefined>();
	const [capWaktu, setCapWaktu] = React.useState<string | null | undefined>(
		null
	);

	const { isFetching, data, error } = useQuery<TransUraian>({
		queryKey: ["trans.kpi.form", idUraian],
		queryFn: async ({ queryKey }) => {
			const result = await getById(queryKey);
			setTarWaktu(result.waktu);
			result?.capaianWaktu
				? setCapWaktu(result.capaianWaktu)
				: setCapWaktu(new Date().toUTCString());
			return result;
		},
		enabled: !!idUraian,
	});

	const mutation = useMutation({
		mutationFn: doSave,
		onError: (error) => {
			enqueueSnackbar(`${error}`, { variant: "error" });
		},
		onSuccess: () => {
			if (isAdmin)
				qc.invalidateQueries({
					queryKey: [
						"kpi.admin.kpi",
						{
							nipam: staffNipam,
							kpiId: idKpi,
							periode: periode?.periode,
						},
					],
				});
			else
				qc.invalidateQueries({
					queryKey: [
						"trans.kpi.bawahan",
						{
							nipam: staffNipam,
							kpiId: idKpi,
							periode: periode?.periode,
						},
					],
				});

			enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
			reset();
			toggleFormOpen();
		},
	});

	const cancelHandler = () => {
		reset();
		toggleFormOpen();
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const nilaiProdukKerja = hitungNilaiProdukKerja(
			Number(capaianVolumeRef.current?.value),
			Number(data?.volume),
			String(data?.satuan),
			Number(data?.bobot),
			String(waktuRef.current?.value),
			String(data?.target)
		).toFixed(2);
		const nilaiWaktu = hitungNilaiWaktu(
			Number(capaianVolumeRef.current?.value),
			String(waktuRef.current?.value),
			String(data?.waktu),
			String(periode?.periode)
		).toFixed(2);
		const nilaiTotalUraian = hitungNilaiTotalUraian(
			Number(nilaiProdukKerja),
			Number(nilaiWaktu)
		).toFixed(2);

		const formData: TransUraianData = {
			id: Number(data?.id),
			capaianVolume: Number(capaianVolumeRef.current?.value),
			capaianSatuan: String(data?.capaianSatuan),
			capaianWaktu: String(waktuRef.current?.value),
			nilaiProdukKerja: Number(nilaiProdukKerja),
			nilaiWaktu: Number(nilaiWaktu),
			nilaiTotalUraian: Number(nilaiTotalUraian),
			status: AUDIT_STATUS.ENABLED,
		};
		mutation.mutate(formData);
	};

	if (idUraian && isFetching) return <>Loading for data...</>;
	if (error) return <>{JSON.stringify(error)}</>;

	return (
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
					defaultValue={data?.capaianVolume ?? ""}
					inputProps={{
						step: 0.1,
					}}
				/>
			</FormControl>

			<FormControl fullWidth>
				<TanggalComponent
					inputRef={waktuRef}
					tarWaktu={tarWaktu}
					capWaktu={capWaktu}
				/>
			</FormControl>

			<Stack direction="row" spacing={2} justifyContent="flex-end">
				<Button
					variant="contained"
					color="error"
					onClick={cancelHandler}
					endIcon={<DoDisturbIcon />}
				>
					CANCEL
				</Button>
				<LoadingButton
					color="primary"
					type="submit"
					loading={mutation.isLoading}
					loadingPosition="end"
					endIcon={<SaveIcon />}
					variant="contained"
				>
					<span>Save</span>
				</LoadingButton>
			</Stack>
		</Stack>
	);
};

export default KpiKinerjaForm;
