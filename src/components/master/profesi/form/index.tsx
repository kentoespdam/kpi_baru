"use client";
import LevelAutocomplete from "@autocomplete/level";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { Level } from "@myTypes/entity/level";
import { ProfesiData } from "@myTypes/entity/profesi";
import { AUDIT_STATUS } from "@myTypes/index";
import { useProfesiStore } from "@store/filter/master/profesi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
import { doSave, getById } from "src/utils/master/profesi";
const BlockIcon = dynamic(() => import("@mui/icons-material/Block"));
const SaveIcon = dynamic(() => import("@mui/icons-material/Save"));

type ProfesiFormProps = {
	id?: number;
};

const ProfesiForm = (props: ProfesiFormProps) => {
	const { id } = props;
	const qc = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const router = useRouter();
	const profesiRef = React.useRef<HTMLInputElement>(null);
	const [checked, setChecked] = React.useState(true);
	const [levels, setLevels] = React.useState<Level | null>(null);
	const { pageRequest, sortRequest, status, name, level } = useProfesiStore();
	const { isFetching, data } = useQuery({
		queryKey: ["profesi-form", id],
		queryFn: async ({ queryKey }) => {
			const result = await getById(queryKey);
			setChecked(result.status === AUDIT_STATUS.DISABLED ? false : true);
			setLevels(result.level);
			return result;
		},
		enabled: !!id,
	});

	const mutation = useMutation({
		mutationFn: doSave,
		onError: (error) => enqueueSnackbar(`${error}`, { variant: "error" }),
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [
					"master.profesi",
					{ pageRequest, sortRequest },
					{ status, name, level },
				],
			});
			enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
			router.push("/master/profesi");
		},
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setChecked(event.target.checked);

	const setSearchValue = (value: Level | null) => setLevels(value);

	const cancelHandler = () => router.push("/master/profesi");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData: ProfesiData = {
			id: data?.id,
			name: String(profesiRef.current?.value),
			levelId: Number(levels?.id),
			status: checked ? AUDIT_STATUS.ENABLED : AUDIT_STATUS.DISABLED,
		};
		mutation.mutate(formData);
	};

	if (isFetching) return <>Loading for data....</>;

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
				/>
			</FormControl>
			<FormControl variant="standard" fullWidth>
				<TextField
					id="profesi"
					label="Profesi"
					variant="standard"
					inputRef={profesiRef}
					defaultValue={data ? data.name : ""}
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
					startIcon={<BlockIcon />}
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

export default ProfesiForm;
