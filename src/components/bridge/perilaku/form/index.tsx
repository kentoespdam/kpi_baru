"use client";
import { BridgePerilakuData } from "@myTypes/entity/bridge.perilaku";
import { Level } from "@myTypes/entity/level";
import { Perilaku } from "@myTypes/entity/perilaku";
import { AUDIT_STATUS } from "@myTypes/index";
import { useBridgePerilakuStore } from "@store/filter/bridge/perilaku";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doSave, getById } from "@utils/bridge/perilaku";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";

const LevelAutocomplete = dynamic(() => import("@autocomplete/level"));
const PerilakuAutocomplete = dynamic(() => import("@autocomplete/perilaku"));
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

type BridgePerilakuFormProps = {
	id?: number;
};
const BridgePerilakuForm = (props: BridgePerilakuFormProps) => {
	const { id } = props;
	const { pageRequest, sortRequest, perilaku, level, status } =
		useBridgePerilakuStore();
	const qc = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const router = useRouter();

	const [_level, setLevel] = React.useState<Level | null>(null);
	const [_perilaku, setPerilaku] = React.useState<Perilaku | null>(null);
	const [checked, setChecked] = React.useState(true);

	const setSearchLevel = (value: Level | null) => setLevel(value);
	const setSearchPerilaku = (value: Perilaku | null) => setPerilaku(value);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setChecked(event.target.checked);

	const { isFetching, error, data } = useQuery({
		queryKey: ["bridge.kpi.form", id],
		queryFn: async ({ queryKey }) => {
			const result = await getById(queryKey);
			setLevel(result.level);
			setPerilaku(result.perilaku);
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
					"bridge.perilaku",
					{ pageRequest, sortRequest },
					{ perilaku, level, status },
				],
			});
			enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
			router.push("/bridge/perilaku");
		},
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData: BridgePerilakuData = {
			id: data?.id,
			perilakuId: Number(_perilaku?.id),
			levelId: Number(_level?.id),
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
				<LevelAutocomplete
					search={_level}
					setSearchValue={setSearchLevel}
					required
				/>
			</FormControl>
			<FormControl variant="standard" fullWidth>
				<PerilakuAutocomplete
					search={_perilaku}
					setSearchValue={setSearchPerilaku}
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

export default BridgePerilakuForm;
