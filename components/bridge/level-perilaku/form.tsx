import LevelAutocompleteComponent from "@commons/components/autocomplete/level";
import PerilakuAutocompleteComponent from "@commons/components/autocomplete/perilaku";
import { IBridgeLevelPerilakuForm } from "@interfaces/IBridgeLevelPerilaku";
import { EAuditStatus } from "@interfaces/ICommons";
import { ILevel } from "@interfaces/ILevel";
import { IPerilaku } from "@interfaces/IPerilaku";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import {
	handleSave,
	useBridgeLevelPerilakuStore,
} from "@storage/bridge/level-perilaku.store";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import React, { Suspense } from "react";
import { shallow } from "zustand/shallow";

const LevelPerilakuForm = () => {
	const openNotif = useNotifSnackbarStore((state) => state.openNotif);
	const toggleDialog = useFormDialogStore(
		(state) => state.toggleDialog,
		shallow
	);
	const { action, form, pageRequest, setPageRequest, setPages } =
		useBridgeLevelPerilakuStore(
			(state) => ({
				action: state.action,
				form: state.form,
				pageRequest: state.pageRequest,
				setPageRequest: state.setPageRequest,
				setPages: state.setPages,
			}),
			shallow
		);
	const [level, setLevel] = React.useState<ILevel | null | undefined>(
		form?.level
	);
	const [perilaku, setPerilaku] = React.useState<
		IPerilaku | null | undefined
	>(form?.perilaku);
	const [checked, setChecked] = React.useState(
		form?.status === EAuditStatus.Enabled ? true : false
	);

	function setSearchLevel(value: ILevel | null | undefined) {
		setLevel(value);
	}

	function setSearchPerilaku(value: IPerilaku | null | undefined) {
		setPerilaku(value);
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setChecked(event.target.checked);
	}

	function cancelHandler() {
		toggleDialog();
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const data: IBridgeLevelPerilakuForm = {};
		data.levelId = level?.id;
		delete data.level;
		data.perilakuId = perilaku?.id;
		delete data.perilaku;
		data.status = checked ? EAuditStatus.Enabled : EAuditStatus.Disabled;
		if (action === "update") data.id = form?.id;

		handleSave(
			openNotif,
			toggleDialog,
			data,
			pageRequest,
			setPages,
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
							setSearchValue={setSearchLevel}
						/>
					</Suspense>
				</FormControl>
				<FormControl variant="standard" fullWidth>
					<Suspense>
						<PerilakuAutocompleteComponent
							search={perilaku}
							setSearchValue={setSearchPerilaku}
						/>
					</Suspense>
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

export default LevelPerilakuForm;
