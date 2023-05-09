import LevelAutocompleteComponent from "@commons/components/autocomplete/level";
import { EAuditStatus } from "@commons/interfaces/ICommons";
import { IGradeForm } from "@commons/interfaces/IGrade";
import { ILevel } from "@commons/interfaces/ILevel";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { handleSaveGrade, useGradeStore } from "@storage/master/grade.store";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import React, { Suspense } from "react";

const GradeForm = () => {
	const gradeRef = React.useRef<HTMLInputElement>(null);
	const tukinRef = React.useRef<HTMLInputElement>(null);
	const openNotif = useNotifSnackbarStore((state) => state.openNotif);
	const toggleDialog = useFormDialogStore((state) => state.toggleDialog);
	const { action, form, setForm, pageRequest, setPage } = useGradeStore(
		(state) => ({
			action: state.action,
			form: state.form,
			setForm: state.setForm,
			pageRequest: state.pageRequest,
			setPage: state.setPages,
		})
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
		const gradeForm: IGradeForm = {};
		gradeForm.grade = Number(gradeRef.current!.value);
		gradeForm.tukin = Number(tukinRef.current!.value);
		gradeForm.level = level;
		gradeForm.status = checked
			? EAuditStatus.Enabled
			: EAuditStatus.Disabled;
		if (action === "update") gradeForm.id = form?.id;

		handleSaveGrade(
			openNotif,
			toggleDialog,
			gradeForm,
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
						id="grade"
						inputRef={gradeRef}
						label="Grade"
						variant="standard"
						defaultValue={form?.grade || ""}
						required
					/>
				</FormControl>
				<FormControl variant="standard" fullWidth>
					<TextField
						id="tukin"
						inputRef={tukinRef}
						label="Tukin"
						variant="standard"
						defaultValue={form?.tukin || ""}
						required
					/>
				</FormControl>
				<FormGroup>
					<FormControlLabel
						control={
							<Switch
								checked={checked}
								onChange={handleChange}
								inputProps={{
									"aria-label": "controlled",
								}}
							/>
						}
						label="Enabled"
					/>
				</FormGroup>

				<Stack spacing={2} direction="row" justifyContent="flex-end">
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

export default GradeForm;
