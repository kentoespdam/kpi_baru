"use client";

import BlockIcon from "@mui/icons-material/Block";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { LevelData } from "@myTypes/entity/level";
import { AUDIT_STATUS } from "@myTypes/index";
import { useLevelStore } from "@store/filter/master/level";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
import { doSave, getById } from "src/utils/master/level";

type LevelFormProps = {
	id?: number;
};
const LevelForm = (props: LevelFormProps) => {
	const { id } = props;
	const levelRef = React.useRef<HTMLInputElement>(null);
	const [checked, setChecked] = React.useState(true);
	const router = useRouter();
	const { pageRequest, sortRequest, status, level } = useLevelStore();
	const qc = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

	const { status: qStatus, data } = useQuery({
		queryKey: ["master.level.form", id],
		queryFn: async ({ queryKey }) => {
			const response = await getById(queryKey);
			if (response)
				setChecked(
					response.status === AUDIT_STATUS.DISABLED ? false : true
				);
			return response;
		},
		enabled: !!id,
		refetchOnMount: true,
	});

	const mutation = useMutation({
		mutationFn: doSave,
		onError: (error) => {
			enqueueSnackbar(`${error}`, { variant: "error" });
		},
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [
					"master.level",
					{ pageRequest, sortRequest, status, level },
				],
			});
			enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
			router.push("/master/level");
		},
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setChecked(event.target.checked);

	const cancelHandler = () => router.push("/master/level");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const level: LevelData = {
			id: data?.id,
			level: levelRef.current!.value,
			status: checked ? AUDIT_STATUS.ENABLED : AUDIT_STATUS.DISABLED,
		};

		mutation.mutate(level);
	};

	if (id && qStatus === "loading") return <>Loading for data....</>;
	return (
		<Stack component="form" spacing={2} onSubmit={handleSubmit}>
			<FormControl fullWidth>
				<TextField
					id="level"
					inputRef={levelRef}
					label="Level"
					variant="standard"
					defaultValue={data ? data.level : ""}
					required
				/>
			</FormControl>
			<FormGroup aria-label="position" row>
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
					labelPlacement="start"
					sx={{ mx: 0 }}
				/>
			</FormGroup>
			<Stack direction="row" spacing={2} justifyContent="flex-end">
				<Button
					variant="contained"
					color="error"
					onClick={cancelHandler}
					startIcon={<BlockIcon />}
				>
					CANCEL
				</Button>
				<LoadingButton
					loading={mutation.isLoading}
					variant="contained"
					color="primary"
					startIcon={<SaveIcon />}
					type="submit"
				>
					SIMPAN
				</LoadingButton>
			</Stack>
		</Stack>
	);
};

export default LevelForm;
