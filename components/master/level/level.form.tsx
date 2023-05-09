import { EAuditStatus } from "@commons/interfaces/ICommons";
import { ILevelForm } from "@commons/interfaces/ILevel";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { handleSave, useLevelStore } from "@storage/master/level.store";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import React, { ChangeEvent } from "react";
import { shallow } from "zustand/shallow";

const LevelForm = () => {
	const openNotif = useNotifSnackbarStore((state) => state.openNotif);
	const levelRef = React.useRef<HTMLInputElement>(null);
	const toggleDialog = useFormDialogStore((state) => state.toggleDialog);
	const { action, form, pageRequest, setPages } = useLevelStore(
		(state) => ({
			action: state.action,
			form: state.form,
			pageRequest: state.pageRequest,
			setPages: state.setPages,
		}),
		shallow
	);

	const [checked, setChecked] = React.useState(
		form?.status === EAuditStatus.Enabled ? true : false
	);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};

	const cancelHandler = () => toggleDialog();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const levelForm: ILevelForm = {};
		levelForm.status = checked
			? EAuditStatus.Enabled
			: EAuditStatus.Disabled;
		levelForm.level = levelRef.current!.value;
		if (action === "update") levelForm.id = form?.id;

		handleSave(
			openNotif,
			toggleDialog,
			levelForm,
			pageRequest,
			setPages,
			action
		);
	};

	return (
		<>
			<DialogContent>
				<Stack
					spacing={2}
					sx={{ mt: 1 }}
					component="form"
					onSubmit={handleSubmit}
				>
					<FormControl variant="standard" fullWidth>
						<TextField
							id="level"
							inputRef={levelRef}
							label="Level"
							variant="standard"
							defaultValue={form?.level || ""}
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

					<Stack
						spacing={2}
						direction="row"
						justifyContent="flex-end"
					>
						<Button
							variant="contained"
							color="error"
							onClick={cancelHandler}
						>
							CANCEL
						</Button>
						<Button
							variant="contained"
							color="primary"
							type="submit"
						>
							SAVE
						</Button>
					</Stack>
				</Stack>
			</DialogContent>
		</>
	);
};

export default LevelForm;
