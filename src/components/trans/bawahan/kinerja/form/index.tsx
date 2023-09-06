import {
	hitungNilaiProdukKerja,
	hitungNilaiTotalUraian,
	hitungNilaiWaktu,
} from "@helper/hitung";
import Stack from "@mui/material/Stack";

import { TransUraian, TransUraianData } from "@myTypes/entity/trans.uraian";
import { AUDIT_STATUS } from "@myTypes/index";
import { useViewFormKinerjaDialogStore } from "@store/dialog/view.form.kinerja";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doSave, getById } from "@utils/trans/uraian";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
import React from "react";

const WaktuAutocomplete = dynamic(() => import("@autocomplete/waktu"));
const DoDisturbIcon = dynamic(() => import("@mui/icons-material/DoDisturb"));
const SaveIcon = dynamic(() => import("@mui/icons-material/Save"));
const LoadingButton = dynamic(() => import("@mui/lab/LoadingButton"));
const Button = dynamic(() => import("@mui/material/Button"));
const FormControl = dynamic(() => import("@mui/material/FormControl"));
const TextField = dynamic(() => import("@mui/material/TextField"));

const KpiKinerjaForm = () => {
	const {
		toggleFormKinerjaOpen: toggleFormOpen,
		staffNipam,
		idKpi,
		idUraian,
		reset,
	} = useViewFormKinerjaDialogStore();
	const periode = useTransKpiStore((state) => state.periode);
	const { enqueueSnackbar } = useSnackbar();
	const qc = useQueryClient();
	const capaianVolumeRef = React.useRef<HTMLInputElement>(null);
	const [waktu, setWaktu] = React.useState<string | null | undefined>(null);

	const { isFetching, data, error } = useQuery<TransUraian>({
		queryKey: ["trans.kpi.form", idUraian],
		queryFn: async ({ queryKey }) => {
			const result = await getById(queryKey);
			setWaktu(result?.capaianWaktu ? result.capaianWaktu : result.waktu);
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

	const setSearchWaktu = (value: string | null | undefined) =>
		setWaktu(value);

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
			String(waktu),
			String(data?.target)
		).toFixed(2);
		const nilaiWaktu = hitungNilaiWaktu(
			Number(capaianVolumeRef.current?.value),
			String(waktu),
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
			capaianWaktu: String(waktu),
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
				<WaktuAutocomplete
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
					endIcon={<DoDisturbIcon />}
				>
					CANCEL
				</Button>
				<LoadingButton
					color="primary"
					// onClick={handleSubmit}
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
