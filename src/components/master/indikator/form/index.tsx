"use client";

import KpiAutocomplete from "@autocomplete/kpi";
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
import { IndikatorData } from "@myTypes/entity/indikator";
import { Kpi } from "@myTypes/entity/kpi";
import { AUDIT_STATUS } from "@myTypes/index";
import { useIndikatorStore } from "@store/filter/master/indikator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doSave, getById } from "@utils/master/indikator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { FormEvent, useRef, useState } from "react";

type IndikatorFormComponentProps = {
	idKpi?: number;
	id?: number;
};
const IndikatorFormComponent = (props: IndikatorFormComponentProps) => {
	const { idKpi, id } = props;
	const indikatorRef = useRef<HTMLInputElement>(null);
	const urutRef = useRef<HTMLInputElement>(null);
	const { enqueueSnackbar } = useSnackbar();
	const router = useRouter();
	const [kpis, setKpis] = useState<Kpi | null>(null);
	const [checked, setChecked] = useState(true);
	const { pageRequest, sortRequest, kpiId, indikator, status } =
		useIndikatorStore();
	const qc = useQueryClient();

	const {
		status: qStatus,
		data,
		error,
	} = useQuery({
		queryKey: ["kpi.form", id],
		queryFn: async ({ queryKey }) => {
			const result = await getById(queryKey);
			setKpis(result.kpi!);
			setChecked(result.status === AUDIT_STATUS.DISABLED ? false : true);
			return result;
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
					"master.indikator",
					{ pageRequest, sortRequest },
					{ kpiId, indikator, status },
				],
			});
			enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
			router.push("/master/kpi");
		},
	});

	const setSearchKpis = (value: Kpi | null) => setKpis(value);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setChecked(event.target.checked);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData: IndikatorData = {
			id: data?.id,
			kpiId: Number(kpis?.id),
			indikator: String(indikatorRef.current?.value),
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
			<FormControl variant="standard" fullWidth>
				<KpiAutocomplete
					search={kpis}
					setSearchValue={setSearchKpis}
					kpiId={idKpi ? idKpi : kpiId ? kpiId : null}
					required
				/>
			</FormControl>

			<FormControl fullWidth>
				<TextField
					id="indikator"
					label="Indikator"
					variant="standard"
					inputRef={indikatorRef}
					defaultValue={data ? data.indikator : ""}
					required
				/>
			</FormControl>

			<FormControl fullWidth>
				<TextField
					id="urut"
					label="Urut"
					type="number"
					variant="standard"
					inputRef={urutRef}
					defaultValue={data ? data.urut : null}
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
					href="/master/kpi"
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

export default IndikatorFormComponent;
