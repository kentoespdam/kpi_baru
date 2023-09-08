"use client";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { AUDIT_STATUS } from "@myTypes/index";
import { usePerilakuStore } from "@store/filter/master/perilaku";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { ChangeEvent, useRef, useState } from "react";
import { doSave, getById } from "src/utils/master/perilaku";
const DoDisturbIcon = dynamic(() => import("@mui/icons-material/DoDisturb"));
const SaveIcon = dynamic(() => import("@mui/icons-material/Save"));

type PerilakuFormProps = {
	id?: number;
};

const PerilakuForm = (props: PerilakuFormProps) => {
	const { id } = props;
	const { enqueueSnackbar } = useSnackbar();
	const router = useRouter();
	const kompetensiRef = useRef<HTMLInputElement>(null);
	const uraianRef = useRef<HTMLInputElement>(null);
	const urutRef = useRef<HTMLInputElement>(null);
	const [checked, setChecked] = useState(true);
	const qc = useQueryClient();
	const { pageRequest, sortRequest, status, kompetensi, uraian } =
		usePerilakuStore();

	const {
		status: qStatus,
		data,
		error,
	} = useQuery({
		queryKey: ["perilaku.form", id],
		queryFn: async ({ queryKey }) => {
			const result = await getById(queryKey);
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
					"master.perilaku",
					{ pageRequest, sortRequest },
					{ status, kompetensi, uraian },
				],
			});
			enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
			router.push("/master/perilaku");
		},
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = {
			id: data?.id,
			kompetensi: String(kompetensiRef.current?.value),
			uraian: String(uraianRef.current?.value),
			urut: Number(urutRef.current?.value),
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
			<FormControl fullWidth>
				<TextField
					id="kompetensi"
					label="Kompetensi"
					variant="outlined"
					defaultValue={data ? data.kompetensi : ""}
					inputRef={kompetensiRef}
					multiline
					rows={2}
					required
				/>
			</FormControl>
			<FormControl fullWidth>
				<TextField
					id="uraian"
					label="Uraian"
					variant="outlined"
					defaultValue={data ? data.uraian : ""}
					inputRef={uraianRef}
					multiline
					rows={5}
					required
				/>
			</FormControl>
			<FormControl fullWidth>
				<TextField
					id="urut"
					label="Urut"
					variant="outlined"
					defaultValue={data ? data.urut : 1}
					inputRef={urutRef}
					type="number"
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
					href="/master/perilaku"
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
				>
					<span>Save</span>
				</LoadingButton>
			</Stack>
		</Stack>
	);
};

export default PerilakuForm;
