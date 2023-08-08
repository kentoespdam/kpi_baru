import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { TransPerilakuNilaiData } from "@myTypes/entity/trans.perilaku.nilai";
import { useViewFormPerilakuDialogStore } from "@store/dialog/view.form.perilaku";
import { useTransKinerjaStore } from "@store/filter/trans/kinerja";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useTransPerilakuStore } from "@store/filter/trans/perilaku";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doSave } from "@utils/trans/perilaku";
import { useSnackbar } from "notistack";
import { FormEvent, useRef } from "react";

const TransPerilakuForm = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { toggleFormPerilakuOpen, perilaku } =
		useViewFormPerilakuDialogStore();
	const periode = useTransKpiStore((state) => state.periode);
	const nipamStaff = useTransKinerjaStore((state) => state.nipamStaff);
	const levelStaff = useTransPerilakuStore((state) => state.levelStaff);

	const nilaiRef = useRef<HTMLInputElement>(null);

	const qc = useQueryClient();
	const mutation = useMutation({
		mutationFn: doSave,
		onError: (error) => {
			enqueueSnackbar(`${error}`, { variant: "error" });
		},
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [
					"trans.perilaku.bawahan",
					{
						nipam: nipamStaff,
						periode: periode?.periode,
						levelId: levelStaff,
					},
				],
			});
			enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
			toggleFormPerilakuOpen(null);
		},
	});

	const cancelHandler = () => toggleFormPerilakuOpen(null);
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData: TransPerilakuNilaiData = {
			id: perilaku!.id,
			nilai: Number(nilaiRef.current?.value ?? 0),
		};
		mutation.mutate(formData);
	};
	return (
		<Stack
			spacing={2}
			sx={{ mt: 1 }}
			component="form"
			onSubmit={handleSubmit}
		>
			<Typography variant="body1" component="p">
				{perilaku?.kompetensi}
			</Typography>{" "}
			<Typography variant="body1" component="p">
				{perilaku?.uraian}
			</Typography>
			<TextField
				id="nilai"
				name="nilai"
				label="Nilai"
				type="number"
				size="small"
				inputRef={nilaiRef}
				defaultValue={perilaku?.nilai ?? 0}
			/>
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

export default TransPerilakuForm;
