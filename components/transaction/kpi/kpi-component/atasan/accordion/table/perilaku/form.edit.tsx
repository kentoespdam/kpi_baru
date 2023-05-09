import { ITransPerilakuNilaiPost } from "@interfaces/ITransPerilakuNilai";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import {
	updateNilaiHandler,
	useTransPerilakuStore,
} from "@storage/transaction/atasan/trans.perilaku.store";
import { useTransactionKpiStore } from "@storage/transaction/kpi.store";
import React from "react";
import { shallow } from "zustand/shallow";

const PerilakuNilaiForm = () => {
	const perilaku = useTransPerilakuStore((state) => state.perilaku, shallow);
	const nilaiRef = React.useRef<HTMLInputElement>(null);
	const toggleDialog = useFormDialogStore((state) => state.toggleDialog);
	const openNotif = useNotifSnackbarStore(
		(state) => state.openNotif,
		shallow
	);
	const { periode, setPeriode } = useTransactionKpiStore(
		(state) => ({
			periode: state.periode,
			setPeriode: state.setPeriode,
		}),
		shallow
	);

	function cancelHandler() {
		toggleDialog();
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const nilai = nilaiRef.current!.value;
		const form: ITransPerilakuNilaiPost = {
			id: perilaku!.id,
			nilai: parseInt(nilai),
		};

		await updateNilaiHandler(openNotif, toggleDialog, form);
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
				<Typography variant="body1" component="p">
					{perilaku?.kompetensi}
				</Typography>{" "}
				<Typography variant="body1" component="p">
					{perilaku?.uraian}
				</Typography>
				<FormControl fullWidth>
					<TextField
						id="nilai"
						name="nilai"
						label="Nilai"
						type="number"
						size="small"
						inputRef={nilaiRef}
						defaultValue={perilaku?.nilai || ""}
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

export default PerilakuNilaiForm;
