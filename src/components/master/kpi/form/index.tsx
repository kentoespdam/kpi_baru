"use client";
import { Grade } from "@myTypes/entity/grade";
import { KpiData } from "@myTypes/entity/kpi";
import { Position } from "@myTypes/entity/position";
import { Profesi } from "@myTypes/entity/profesi";
import { AUDIT_STATUS } from "@myTypes/index";
import { useKpiStore } from "@store/filter/master/kpi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doSave, getById } from "@utils/master/kpi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";

const GradeAutocomplete = dynamic(() => import("@autocomplete/grade"));
const PositionAutcomplete = dynamic(() => import("@autocomplete/position"));
const ProfesiAutocomplete = dynamic(() => import("@autocomplete/profesi"));
const DoDisturbIcon = dynamic(() => import("@mui/icons-material/DoDisturb"));
const SaveIcon = dynamic(() => import("@mui/icons-material/Save"));
const LoadingButton = dynamic(() => import("@mui/lab/LoadingButton"));
const Button = dynamic(() => import("@mui/material/Button"));
const FormControl = dynamic(() => import("@mui/material/FormControl"));
const FormControlLabel = dynamic(
	() => import("@mui/material/FormControlLabel")
);
const FormGroup = dynamic(() => import("@mui/material/FormGroup"));
const Switch = dynamic(() => import("@mui/material/Switch"));
const TextField = dynamic(() => import("@mui/material/TextField"));

type KpiFormComponentProps = {
	id?: number;
};
const KpiFormComponent = (props: KpiFormComponentProps) => {
	const { id } = props;
	const nameRef = React.useRef<HTMLInputElement>(null);
	const { enqueueSnackbar } = useSnackbar();
	const [positions, setPositions] = React.useState<Position | null>(null);
	const [profesis, setProfesis] = React.useState<Profesi | null>(null);
	const [grades, setGrades] = React.useState<Grade | null>(null);
	const [checked, setChecked] = React.useState(true);
	const router = useRouter();
	const qc = useQueryClient();
	const {
		pageRequest,
		sortRequest,
		organization,
		position,
		profesi,
		name,
		grade,
		status,
	} = useKpiStore();

	const {
		status: qStatus,
		data,
		error,
	} = useQuery({
		queryKey: ["kpi.form", id],
		queryFn: async ({ queryKey }) => {
			const result = await getById(queryKey);
			setPositions(result.position);
			setProfesis(result.profesi);
			setGrades(result.grade);
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
					"master.kpi",
					{ pageRequest, sortRequest },
					{ organization, position, profesi, name, grade, status },
				],
			});
			enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
			router.push("/master/kpi");
		},
	});

	function setSearchPosition(value: Position | null) {
		setPositions(value);
	}

	function setSearchProfesi(value: Profesi | null) {
		setProfesis(value);
	}

	function setSearchGrade(value: Grade | null) {
		setGrades(value);
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setChecked(event.target.checked);
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData: KpiData = {
			id: data?.id,
			organizationId: Number(positions?.organization.id),
			positionId: Number(positions?.id),
			profesiId: Number(profesis?.id),
			name: String(nameRef.current?.value),
			gradeId: Number(grades?.id),
			status: checked ? AUDIT_STATUS.ENABLED : AUDIT_STATUS.DISABLED,
		};
		mutation.mutate(formData);
	};

	if (id && qStatus === "loading") return <>Loading for data...</>;
	if (error) return <>{JSON.stringify(error)}</>;

	return (
		<Stack
			spacing={2}
			sx={{ mt: 1 }}
			component="form"
			onSubmit={handleSubmit}
		>
			<FormControl variant="standard" fullWidth>
				<PositionAutcomplete
					search={positions}
					setSearchValue={setSearchPosition}
					required
				/>
			</FormControl>
			<FormControl variant="standard" fullWidth>
				<TextField
					id="name"
					label="Name"
					variant="standard"
					inputRef={nameRef}
					defaultValue={data ? data.name : ""}
					required
				/>
			</FormControl>
			<FormControl variant="standard" fullWidth>
				<ProfesiAutocomplete
					search={profesis}
					setSearchValue={setSearchProfesi}
					required
				/>
			</FormControl>
			<FormControl variant="standard" fullWidth>
				<GradeAutocomplete
					search={grades}
					setSearchValue={setSearchGrade}
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
					LinkComponent={Link}
					href="/master/kpi"
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

export default KpiFormComponent;
