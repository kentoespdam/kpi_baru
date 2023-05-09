import LevelAutocompleteComponent from "@commons/components/autocomplete/level";
import { EAuditStatus } from "@commons/interfaces/ICommons";
import { ILevel } from "@commons/interfaces/ILevel";
import { IProfesiForm } from "@commons/interfaces/IProfesi";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { useFormDialogStore } from "@storage/form.dialog.store";
import {
	handleSaveProfesi,
	useProfesiStore
} from "@storage/master/profesi.store";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import React, { Suspense } from "react";
import { shallow } from "zustand/shallow";

const ProfesiForm = () => {
	const profesiRef = React.useRef<HTMLInputElement>(null);
	const openNotif = useNotifSnackbarStore((state) => state.openNotif);
	const toggleDialog = useFormDialogStore((state) => state.toggleDialog);
	const { action, form, setForm, pageRequest, setPage } = useProfesiStore(
		(state) => ({
			action: state.action,
			form: state.form,
			setForm: state.setForm,
			pageRequest: state.pageRequest,
			setPage: state.setPages,
		}),
		shallow
	);

	const [level, setLevel] = React.useState<ILevel | null | undefined>(
		form?.level
	);
	const [checked, setChecked] = React.useState(
		form?.status === EAuditStatus.Enabled ? true : false
	);

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setChecked(event.target.checked);
	}

	function setSearchValue(value?: ILevel | null) {
		setLevel(value);
	}

	function cancelHandler() {
		toggleDialog();
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const profesiForm: IProfesiForm = {};
		profesiForm.name = profesiRef.current!.value;
		profesiForm.level = level;
		profesiForm.status = checked
			? EAuditStatus.Enabled
			: EAuditStatus.Disabled;
		if (action === "update") profesiForm.id = form?.id;

		handleSaveProfesi(
			openNotif,
			toggleDialog,
			profesiForm,
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
						<LevelAutocompleteComponent
							search={level}
							setSearchValue={setSearchValue}
						/>
					</Suspense>
				</FormControl>
				<FormControl variant="standard" fullWidth>
					<TextField
						id="profesi"
						label="Profesi"
						variant="standard"
						inputRef={profesiRef}
						defaultValue={form?.name || ""}
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

export default ProfesiForm;
