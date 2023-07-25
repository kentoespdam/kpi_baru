"use client";

import EmployeeAutocomplete from "@components/commons/autocomplete/employee";
import KpiAutocomplete from "@components/commons/autocomplete/kpi";
import LevelAutocomplete from "@components/commons/autocomplete/level";
import OrganizationAutcomplete from "@components/commons/autocomplete/organization";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import { BridgeKpiData } from "@myTypes/entity/bridge.kpi";
import { Employee } from "@myTypes/entity/employee";
import { Kpi } from "@myTypes/entity/kpi";
import { Level } from "@myTypes/entity/level";
import { Organization } from "@myTypes/entity/organization";
import { AUDIT_STATUS } from "@myTypes/index";
import { useBridgeKpiStore } from "@store/filter/bridge/kpi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doSave, getById } from "@utils/bridge/kpi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";

type BridgeKpiFormProps = {
	id?: number;
};
const BridgeKpiForm = (props: BridgeKpiFormProps) => {
	const { id } = props;
	const {
		pageRequest,
		sortRequest,
		nipam,
		name,
		position,
		organization,
		level,
		kpi,
		status,
	} = useBridgeKpiStore();
	const qc = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const router = useRouter();

	const [org, setOrg] = React.useState<Organization | null>(null);
	const [emp, setEmp] = React.useState<Employee | null>(null);
	const [_nipam, setNipam] = React.useState<string | undefined>();
	const [lvl, setLvl] = React.useState<Level | null>(null);
	const [_kpi, setKpi] = React.useState<Kpi | null>(null);
	const [checked, setChecked] = React.useState(true);

	const setSearchOrganization = (value: Organization | null) => setOrg(value);
	const setSearchEmployee = (value: Employee | null) => {
		setEmp(value);
		setNipam(value?.nipam);
	};
	const setSearchLvl = (value: Level | null) => setLvl(value);
	const setSearchKpi = (value: Kpi | null) => setKpi(value);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setChecked(event.target.checked);

	const { isFetching, data, error } = useQuery({
		queryKey: ["bridge.kpi.form", id],
		queryFn: async ({ queryKey }) => {
			const result = await getById(queryKey);
			setOrg(result.organization);
			setNipam(result.nipam);
			setLvl(result.level);
			setKpi(result.kpi);
			setChecked(result.status === AUDIT_STATUS.DISABLED ? false : true);
			return result;
		},
		enabled: !!id,
	});

	const mutation = useMutation({
		mutationFn: doSave,
		onError: (error) => {
			enqueueSnackbar(`${error}`, { variant: "error" });
		},
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [
					"bridge.kpi",
					{ pageRequest, sortRequest },
					{ nipam, name, position, organization, level, kpi, status },
				],
			});
			enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
			router.push("/bridge/kpi");
		},
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData: BridgeKpiData = {
			id: data?.id,
			nipam: String(_nipam),
			name: String(emp?.nama),
			positionId: Number(emp?.position.id),
			organizationId: Number(org?.id),
			levelId: Number(lvl?.id),
			kpiId: Number(_kpi?.id),
			status: checked ? AUDIT_STATUS.ENABLED : AUDIT_STATUS.DISABLED,
		};
		mutation.mutate(formData);
	};

	if (isFetching && id !== undefined) return <>Loading for data...</>;
	if (error) return <>{JSON.stringify(error)}</>;

	return (
		<Stack
			spacing={2}
			sx={{ mt: 1 }}
			component="form"
			onSubmit={handleSubmit}
		>
			<FormControl variant="standard" fullWidth>
				<OrganizationAutcomplete
					search={org}
					setSearchValue={setSearchOrganization}
				/>
			</FormControl>
			<FormControl variant="standard" fullWidth>
				<EmployeeAutocomplete
					search={emp}
					setSearchValue={setSearchEmployee}
					orgCode={org?.code}
					nipam={_nipam}
				/>
			</FormControl>
			<FormControl variant="standard" fullWidth>
				<LevelAutocomplete search={lvl} setSearchValue={setSearchLvl} />
			</FormControl>
			<FormControl variant="standard" fullWidth>
				<KpiAutocomplete search={_kpi} setSearchValue={setSearchKpi} />
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
					LinkComponent={Link}
					href="/bridge/kpi"
					endIcon={<DoDisturbIcon />}
				>
					CANCEL
				</Button>
				<LoadingButton
					color="primary"
					type="submit"
					loading={mutation.isLoading}
					loadingPosition="end"
					endIcon={<SaveIcon />}
					variant="contained"
					sx={{ mt: 2 }}
					size="small"
				>
					<span>SAVE</span>
				</LoadingButton>
			</Stack>
		</Stack>
	);
};

export default BridgeKpiForm;
