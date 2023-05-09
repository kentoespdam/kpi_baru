import React, { Suspense } from "react";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import { shallow } from "zustand/shallow";
import { EAuditStatus } from "@commons/interfaces/ICommons";
import { IUraianIndikatorForm } from "@commons/interfaces/IUraianIndikator";
import IndikatorAutocompleteComponent from "@commons/components/autocomplete/indikator";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { IIndikator } from "@interfaces/IIndikator";
import {
	handleSave,
	useUraianIndikatorStore,
} from "@storage/master/uraian.indikator.store";
import { IKpi } from "@interfaces/IKpi";
import Stack from "@mui/material/Stack";
import KpiAutocompleteComponent from "@commons/components/autocomplete/kpi";
import WaktuAutocompleteComponent from "@commons/components/autocomplete/waktu";

const UraianIndikatorForm = () => {
	const uraianRef = React.useRef<HTMLInputElement>(null);
	const volumeRef = React.useRef<HTMLInputElement>(null);
	const satuanRef = React.useRef<HTMLInputElement>(null);
	const bobotRef = React.useRef<HTMLInputElement>(null);

	const openNotif = useNotifSnackbarStore((state) => state.openNotif);
	const toggleDialog = useFormDialogStore((state) => state.toggleDialog);
	const { action, form, pageRequest, setPage } = useUraianIndikatorStore(
		(state) => ({
			action: state.action,
			form: state.form,
			pageRequest: state.pageRequest,
			setPage: state.setPages,
		}),
		shallow
	);

	const [kpi, setKpi] = React.useState<IKpi | null | undefined>(form?.kpi);
	const [indikator, setIndikator] = React.useState<
		IIndikator | null | undefined
	>(form?.indikator);
	const [waktu, setWaktu] = React.useState<string | null | undefined>(
		form?.waktu ?? "Akhir Bulan"
	);
	const [checked, setChecked] = React.useState(
		form?.status === EAuditStatus.Enabled ? true : false
	);

	function setSearchKpi(value?: IKpi | null) {
		setKpi(value);
	}

	function setSearchIndikator(value?: IIndikator | null) {
		setIndikator(value);
	}

	function setSearchWaktu(value?: string | null) {
		setWaktu(value);
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setChecked(event.target.checked);
	}

	function cancelHandler() {
		toggleDialog();
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const uraianIndikatorForm: IUraianIndikatorForm = {};
		uraianIndikatorForm.uraian = uraianRef.current?.value;
		uraianIndikatorForm.volume = Number(volumeRef.current?.value);
		uraianIndikatorForm.satuan = satuanRef.current?.value;
		uraianIndikatorForm.bobot = Number(bobotRef.current?.value);
		uraianIndikatorForm.status = checked
			? EAuditStatus.Enabled
			: EAuditStatus.Disabled;
		uraianIndikatorForm.kpi = kpi;
		uraianIndikatorForm.indikator = indikator;
		uraianIndikatorForm.waktu = String(waktu);
		if (action === "update") uraianIndikatorForm.id = form?.id;

		handleSave(
			openNotif,
			toggleDialog,
			uraianIndikatorForm,
			setPage,
			pageRequest,
			action
		);
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
					<Suspense>
						<KpiAutocompleteComponent
							search={kpi}
							setSearchValue={setSearchKpi}
						/>
					</Suspense>
				</FormControl>
				<FormControl fullWidth>
					<Suspense>
						<IndikatorAutocompleteComponent
							search={indikator}
							setSearchValue={setSearchIndikator}
							kpiId={kpi?.id ?? 0}
						/>
					</Suspense>
				</FormControl>
				<FormControl fullWidth>
					<TextField
						id="uraian"
						label="Uraian"
						variant="outlined"
						inputRef={uraianRef}
						defaultValue={form?.uraian}
						multiline
						rows={4}
						required
					/>
				</FormControl>
				<FormControl fullWidth>
					<TextField
						id="volume"
						label="Volume"
						variant="outlined"
						inputRef={volumeRef}
						defaultValue={form?.volume}
						type="number"
						required
					/>
				</FormControl>
				<FormControl fullWidth>
					<TextField
						id="satuan"
						label="Satuan"
						variant="outlined"
						inputRef={satuanRef}
						defaultValue={form?.satuan}
						required
					/>
				</FormControl>
				<FormControl fullWidth>
					<WaktuAutocompleteComponent
						search={waktu}
						setSearchValue={setSearchWaktu}
					/>
				</FormControl>
				<FormControl fullWidth>
					<TextField
						id="bobot"
						label="Bobot"
						variant="outlined"
						inputRef={bobotRef}
						defaultValue={form?.bobot}
						type="number"
						required
					/>
				</FormControl>
				<FormControl fullWidth>
					<FormGroup>
						<FormControlLabel
							control={
								<Switch
									checked={checked}
									onChange={handleChange}
									name="status"
								/>
							}
							label="Status"
						/>
					</FormGroup>
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

export default UraianIndikatorForm;
