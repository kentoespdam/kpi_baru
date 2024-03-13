"use client";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { SatuanData } from "@myTypes/entity/satuan";
import { AUDIT_STATUS } from "@myTypes/index";
import { useSatuanStore } from "@store/filter/master/satuan";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doSave, getById } from "@utils/master/satuan";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
const BlockIcon = dynamic(() => import("@mui/icons-material/Block"));
const SaveIcon = dynamic(() => import("@mui/icons-material/Save"));

type SatuanFormProps = {
	id?: number;
};

const SatuanForm = (props: SatuanFormProps) => {
	const { id } = props;
	const satuanRef = React.useRef<HTMLInputElement>(null);
	const [checked, setChecked] = React.useState(true);
	const router = useRouter();
	const { pageRequest, sortRequest, status, satuan } = useSatuanStore();
	const qc = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

	const { status: qStatus, data } = useQuery({
		queryKey: ["master.satuan.form", id],
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
					"master.satuan",
					{ pageRequest, sortRequest, status, satuan },
				],
			});
			enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
			router.push("/master/satuan");
		},
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setChecked(event.target.checked);

	const cancelHandler = () => router.push("/master/satuan");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData: SatuanData = {
			id: data?.id,
			satuan: satuanRef.current!.value,
			status: checked ? AUDIT_STATUS.ENABLED : AUDIT_STATUS.DISABLED,
		};

		mutation.mutate(formData);
	};

	if (id && qStatus === "loading") return <>Loading for data....</>;

	return (
		<Stack component="form" spacing={2} onSubmit={handleSubmit}>
			<FormControl fullWidth>
				<TextField
					id="satuan"
					inputRef={satuanRef}
					label="Satuan"
					variant="standard"
					defaultValue={data ? data.satuan : ""}
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

export default SatuanForm;
