import React, { Suspense } from "react";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import { handleSave, useKpiStore } from "@storage/master/kpi.store";
import { shallow } from "zustand/shallow";
import { EAuditStatus } from "@commons/interfaces/ICommons";
import { IKpiForm } from "@commons/interfaces/IKpi";
import OrganizationAutocompleteComponent from "@commons/components/autocomplete/organization";
import PositionAutocompleteComponent from "@commons/components/autocomplete/position";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import GradeAutocompleteComponent from "@commons/components/autocomplete/grade";
import Button from "@mui/material/Button";
import { IOrganization } from "@interfaces/IOrganization";
import { IPosition } from "@interfaces/IPosition";
import { IGrade } from "@interfaces/IGrade";
import { IProfesi } from "@interfaces/IProfesi";
import ProfesiAutoCompleteComponent from "@commons/components/autocomplete/profesi";

const KpiForm = () => {
	const nameRef = React.useRef<HTMLInputElement>(null);
	const openNotif = useNotifSnackbarStore((state) => state.openNotif);
	const toggleDialog = useFormDialogStore((state) => state.toggleDialog);
	const { action, form, pageRequest, setPage } = useKpiStore(
		(state) => ({
			action: state.action,
			form: state.form,
			pageRequest: state.pageRequest,
			setPage: state.setPages,
		}),
		shallow
	);
	const [organization, setOrganization] = React.useState<
		IOrganization | null | undefined
	>(form?.organization);
	const [position, setPosition] = React.useState<
		IPosition | null | undefined
	>(form?.position);
	const [profesi, setProfesi] = React.useState<IProfesi | null | undefined>(
		form?.profesi
	);
	const [grade, setGrade] = React.useState<IGrade | null | undefined>(
		form?.grade
	);
	const [checked, setChecked] = React.useState(
		form?.status === EAuditStatus.Enabled ? true : false
	);

	function setSearchOrganization(value?: IOrganization | null) {
		setOrganization(value);
	}

	function setSearchPosition(value?: IPosition | null) {
		setPosition(value);
	}

	function setSearchProfesi(value?: IProfesi | null) {
		setProfesi(value);
	}

	function setSearchGrade(value?: IGrade | null) {
		setGrade(value);
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setChecked(event.target.checked);
	}

	function cancelHandler() {
		toggleDialog();
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const kpiForm: IKpiForm = {};
		kpiForm.name = nameRef.current?.value;
		kpiForm.organization = organization;
		kpiForm.position = position;
		kpiForm.profesi = profesi;
		kpiForm.grade = grade;
		kpiForm.status = checked ? EAuditStatus.Enabled : EAuditStatus.Disabled;
		if (action === "update") kpiForm.id = form?.id;

		handleSave(
			openNotif,
			toggleDialog,
			kpiForm,
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
						<OrganizationAutocompleteComponent
							search={organization}
							setSearchValue={setSearchOrganization}
						/>
					</Suspense>
				</FormControl>
				<FormControl variant="standard" fullWidth>
					<Suspense>
						<PositionAutocompleteComponent
							search={position}
							setSearchValue={setSearchPosition}
						/>
					</Suspense>
				</FormControl>
				<FormControl variant="standard" fullWidth>
					<TextField
						id="name"
						label="Name"
						variant="standard"
						inputRef={nameRef}
						defaultValue={form?.name || ""}
						required
					/>
				</FormControl>
				<FormControl variant="standard" fullWidth>
					<Suspense>
						<ProfesiAutoCompleteComponent
							search={profesi}
							setSearchValue={setSearchProfesi}
						/>
					</Suspense>
				</FormControl>
				<FormControl variant="standard" fullWidth>
					<Suspense>
						<GradeAutocompleteComponent
							search={grade}
							setSearchValue={setSearchGrade}
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

export default KpiForm;
