"use client";

import LevelAutocomplete from "@components/commons/autocomplete/level";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { GradeData } from "@myTypes/entity/grade";
import { Level } from "@myTypes/entity/level";
import { AUDIT_STATUS } from "@myTypes/index";
import { useGradeStore } from "@store/filter/master/grade";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useRef, useState } from "react";
import { doSave, getById } from "src/utils/master/grade";

type GradeFormProps = {
	id?: number;
};

const GradeForm = (props: GradeFormProps) => {
	const { id } = props;
	const { enqueueSnackbar } = useSnackbar();
	const router = useRouter();
	const gradeRef = useRef<HTMLInputElement>(null);
	const tukinRef = useRef<HTMLInputElement>(null);
	const [checked, setChecked] = useState(true);
	const [levels, setLevels] = useState<Level | null>(null);
	const { pageRequest, sortRequest, status, grade, tukin, level } =
		useGradeStore();
	const qc = useQueryClient();

	const {
		status: qStatus,
		data,
		error,
	} = useQuery({
		queryKey: ["master.grade.form", id],
		queryFn: async ({ queryKey }) => {
			const response = await getById(queryKey);
			if (response) {
				setLevels(response.level);
				setChecked(
					response.status === AUDIT_STATUS.DISABLED ? false : true
				);
			}
			return response;
		},
		enabled: !!id,
		retryOnMount: true,
	});

	const mutation = useMutation({
		mutationFn: doSave,
		onError: (error) => {
			enqueueSnackbar(`${error}`, { variant: "error" });
		},
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [
					"master.grade",
					{ pageRequest, sortRequest },
					{ status, grade, tukin, level },
				],
			});
			enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
			router.push("/master/grade");
		},
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setChecked(event.target.checked);

	const setSearchValue = (value: Level | null) => setLevels(value);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const gradeData: GradeData = {
			id: data.id,
			grade: Number(gradeRef.current?.value),
			tukin: Number(tukinRef.current?.value),
			levelId: levels!.id,
			status: checked ? AUDIT_STATUS.ENABLED : AUDIT_STATUS.DISABLED,
		};
		mutation.mutate(gradeData);
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
				<LevelAutocomplete
					search={levels}
					setSearchValue={setSearchValue}
					required
				/>
			</FormControl>
			<FormControl variant="standard" fullWidth>
				<TextField
					id="grade"
					inputRef={gradeRef}
					type="number"
					label="Grade"
					variant="standard"
					value={data?.grade || ""}
					required
				/>
			</FormControl>
			<FormControl variant="standard" fullWidth>
				<TextField
					id="tukin"
					inputRef={tukinRef}
					label="Tukin"
					variant="standard"
					type="number"
					value={data?.tukin || ""}
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
					LinkComponent={Link}
					href="/master/grade"
					endIcon={<DoDisturbIcon />}
				>
					CANCEL
				</Button>
				<LoadingButton
					color="primary"
					// onClick={handleSubmit}
					type="submit"
					loading={mutation.isLoading}
					loadingPosition="end"
					endIcon={<SaveIcon />}
					variant="contained"
				>
					<span>Save</span>
				</LoadingButton>
			</Stack>
		</Stack>
	);
};

export default GradeForm;
