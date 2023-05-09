import React, { useState, useEffect, useRef, Suspense } from "react";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import { handleSave, useIndikatorStore } from "@storage/master/indikator.store";
import { shallow } from "zustand/shallow";
import { EAuditStatus } from "@commons/interfaces/ICommons";
import { IIndikatorForm } from "@commons/interfaces/IIndikator";
import KpiAutocompleteComponent from "@commons/components/autocomplete/kpi";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { IKpi } from "@interfaces/IKpi";

const IndikatorForm = () => {
	const indikatorRef = useRef<HTMLInputElement>(null);
	const urutRef = useRef<HTMLInputElement>(null);
	const openNotif = useNotifSnackbarStore((state) => state.openNotif);
	const toggleDialog = useFormDialogStore((state) => state.toggleDialog);
	const { action, form, pageRequest, setPage } = useIndikatorStore(
		(state) => ({
			action: state.action,
			form: state.form,
			pageRequest: state.pageRequest,
			setPage: state.setPages,
		}),
		shallow
	);

	const [kpi, setKpi] = useState<IKpi | null | undefined>(form?.kpi);
	const [checked, setChecked] = React.useState(
		form?.status === EAuditStatus.Enabled ? true : false
	);

	function setSearchKpi(value?: IKpi | null) {
		setKpi(value);
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setChecked(event.target.checked);
	}

	function cancelHandler() {
		toggleDialog();
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const indikatorForm: IIndikatorForm = {};
		indikatorForm.indikator = indikatorRef.current?.value;
		indikatorForm.urut = Number(urutRef.current?.value);
		indikatorForm.status = checked
			? EAuditStatus.Enabled
			: EAuditStatus.Disabled;
		indikatorForm.kpi = kpi;
		if (action === "update") indikatorForm.id = form?.id;

		handleSave(
			openNotif,
			toggleDialog,
			indikatorForm,
			pageRequest,
			setPage,
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
				<FormControl variant="standard" fullWidth>
					<Suspense>
						<KpiAutocompleteComponent
							search={kpi}
							setSearchValue={setSearchKpi}
						/>
					</Suspense>
				</FormControl>
				<FormControl variant="standard" fullWidth>
					<TextField
						id="indikator"
						label="Indikator"
						variant="standard"
						inputRef={indikatorRef}
						defaultValue={form?.indikator || ""}
						required
					/>
				</FormControl>
				<FormControl variant="standard" fullWidth>
					<TextField
						id="urut"
						label="Urut"
						variant="standard"
						inputRef={urutRef}
						defaultValue={form?.urut || ""}
						required
					/>
				</FormControl>
				<FormGroup>
					<FormControlLabel
						control={
							<Switch
								checked={checked}
								onChange={handleChange}
								name="status"
								color="primary"
								inputProps={{
									"aria-label": "primary checkbox",
								}}
							/>
						}
						label="Enabled"
					/>
				</FormGroup>

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

export default IndikatorForm;
