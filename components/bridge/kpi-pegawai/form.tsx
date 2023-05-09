import EmployeeAutocompleteComponent from "@commons/components/autocomplete/employee";
import KpiAutocompleteComponent from "@commons/components/autocomplete/kpi";
import LevelAutocompleteComponent from "@commons/components/autocomplete/level";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import { Suspense } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import {
	handleSave,
	useBridgeKpiPegawaiStore,
} from "@storage/bridge/kpi-pegawai.store";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import { shallow } from "zustand/shallow";
import React from "react";
import { EAuditStatus } from "@interfaces/ICommons";
import { IEmployee } from "@interfaces/IEmployee";
import { ILevel } from "@interfaces/ILevel";
import { IKpi } from "@interfaces/IKpi";
import { IBridgeKpiPegawaiForm } from "@interfaces/IBridgeKpiPegawai";
import OrganizationAutocompleteComponent from "@commons/components/autocomplete/organization";
import { IOrganization } from "@interfaces/IOrganization";

const KpiPegawaiForm = () => {
	const openNotif = useNotifSnackbarStore((state) => state.openNotif);
	const toggleDialog = useFormDialogStore((state) => state.toggleDialog);
	const { action, form, pageRequest, setPage } = useBridgeKpiPegawaiStore(
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
	>(form?.employee?.organization);
	const [employee, setEmployee] = React.useState<
		IEmployee | null | undefined
	>(form?.employee);
	const [level, setLevel] = React.useState<ILevel | null | undefined>(
		form?.level
	);
	const [kpi, setKpi] = React.useState<IKpi | null | undefined>(form?.kpi);
	const [checked, setChecked] = React.useState(
		form?.status === EAuditStatus.Enabled ? true : false
	);

	function setSearchOrganization(value: IOrganization | null | undefined) {
		setOrganization(value);
	}

	function setSearchEmployee(value: IEmployee | null | undefined) {
		setEmployee(value);
	}

	function setSearchLevel(value: ILevel | null | undefined) {
		setLevel(value);
	}

	function setSearchKpi(value: IKpi | null | undefined) {
		setKpi(value);
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setChecked(event.target.checked);
	}

	function cancelHandler() {
		toggleDialog();
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const bridgeForm: IBridgeKpiPegawaiForm = {};
		bridgeForm.employee = employee;
		bridgeForm.name = employee?.nama;
		bridgeForm.organizationId = employee?.organization?.id;
		bridgeForm.positionId = employee?.position?.id;
		bridgeForm.level = level;
		bridgeForm.kpi = kpi;
		bridgeForm.status = checked
			? EAuditStatus.Enabled
			: EAuditStatus.Disabled;
		if (action === "update") bridgeForm.id = form?.id;

		handleSave(
			openNotif,
			toggleDialog,
			bridgeForm,
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
						<EmployeeAutocompleteComponent
							search={employee}
							setSearchValue={setSearchEmployee}
							orgCode={organization?.code}
						/>
					</Suspense>
				</FormControl>
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
						<KpiAutocompleteComponent
							search={kpi}
							setSearchValue={setSearchKpi}
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

export default KpiPegawaiForm;
