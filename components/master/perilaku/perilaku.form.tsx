import { EAuditStatus } from "@interfaces/ICommons";
import { IPerilakuForm } from "@interfaces/IPerilaku";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { handleSave, usePerilakuStore } from "@storage/master/perilaku.store";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import React, { useRef } from "react";
import { shallow } from "zustand/shallow";

const PerilakuForm = () => {
	const kompetensiRef = useRef<HTMLInputElement>(null);
	const uraianRef = useRef<HTMLInputElement>(null);
	const urutRef = useRef<HTMLInputElement>(null);
	const openNotif = useNotifSnackbarStore((state) => state.openNotif);
	const toggleDialog = useFormDialogStore((state) => state.toggleDialog);
	const { action, form, pageRequest, setPage } = usePerilakuStore(
		(state) => ({
			action: state.action,
			form: state.form,
			pageRequest: state.pageRequest,
			setPage: state.setPages,
		}),
		shallow
	);

	const [checked, setChecked] = React.useState(
		form?.status === EAuditStatus.Enabled ? true : false
	);

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setChecked(event.target.checked);
	}

	function cancelHandler() {
		toggleDialog();
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const perilakuForm: IPerilakuForm = {};
		perilakuForm.kompetensi = kompetensiRef.current?.value;
		perilakuForm.uraian = uraianRef.current?.value;
		perilakuForm.urut = Number(urutRef.current?.value);
		perilakuForm.status = checked
			? EAuditStatus.Enabled
			: EAuditStatus.Disabled;
		if (action === "update") perilakuForm.id = form?.id;

		handleSave(
			openNotif,
			toggleDialog,
			perilakuForm,
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
				<FormControl variant="outlined" fullWidth>
					<TextField
						id="kompetensi"
						label="Kompetensi"
						variant="outlined"
						defaultValue={form?.kompetensi}
						inputRef={kompetensiRef}
						multiline
						rows={2}
						required
					/>
				</FormControl>
				<FormControl variant="outlined" fullWidth>
					<TextField
						id="uraian"
						label="Uraian"
						variant="outlined"
						defaultValue={form?.uraian}
						inputRef={uraianRef}
						multiline
						rows={5}
						required
					/>
				</FormControl>
				<FormControl variant="outlined" fullWidth>
					<TextField
						id="urut"
						label="Urut"
						variant="outlined"
						defaultValue={form?.urut}
						inputRef={urutRef}
						type="number"
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

export default PerilakuForm;
