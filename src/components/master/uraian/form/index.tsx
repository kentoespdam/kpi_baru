"use client";

import IndikatorAutocomplete from "@components/commons/autocomplete/indikator";
import KpiAutocomplete from "@components/commons/autocomplete/kpi";
import WaktuAutocomplete from "@components/commons/autocomplete/waktu";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { Indikator } from "@myTypes/entity/indikator";
import { Kpi } from "@myTypes/entity/kpi";
import { AUDIT_STATUS } from "@myTypes/index";
import { useUraianStore } from "@store/filter/master/uraian";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doSave, getById } from "@utils/master/uraian";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";

type UraianFormProps = {
	idIndikator?: number;
	uraianId?: number;
};
const UraianForm = (props: UraianFormProps) => {
	const { idIndikator, uraianId } = props;
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();
	const [kpis, setKpis] = useState<Kpi | null>(null);
	const [indikators, setIndikators] = useState<Indikator | null>(null);
	const [targets, setTargets] = useState<"MIN" | "MAX">("MIN");
	const [waktus, setWaktus] = useState<string | null | undefined>(
		"Akhir Bulan"
	);
	const [checked, setChecked] = useState(true);
	const uraianRef = useRef<HTMLInputElement>(null);
	const volumeRef = useRef<HTMLInputElement>(null);
	const satuanRef = useRef<HTMLInputElement>(null);
	const bobotRef = useRef<HTMLInputElement>(null);
	const qc = useQueryClient();
	const {
		pageRequest,
		sortRequest,
		indikatorId,
		uraian,
		kpiId,
		profesiId,
		levelId,
		status,
	} = useUraianStore();

	const {
		status: qStatus,
		error,
		data,
	} = useQuery({
		queryKey: ["uraian.form", uraianId],
		queryFn: async ({ queryKey }) => {
			const result = await getById(queryKey);
			setKpis(result.kpi);
			setIndikators(result.indikator);
			setTargets(result.target);
			setWaktus(result.waktu);
			setChecked(result.status === AUDIT_STATUS.DISABLED ? false : true);
			return result;
		},
		enabled: !!uraianId,
	});

	const mutation = useMutation({
		mutationFn: doSave,
		onError: (error) => {
			enqueueSnackbar(`${error}`, { variant: "error" });
		},
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [
					"master.uraian",
					{ pageRequest, sortRequest },
					{ indikatorId, uraian, kpiId, profesiId, levelId, status },
				],
			});
			enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
			router.push("/master/kpi");
		},
	});

	const handleChangeKpi = (value: Kpi | null) => setKpis(value);
	const handleChangeIndikator = (value: Indikator | null) =>
		setIndikators(value);
	const handleChangeTarget = (event: React.ChangeEvent<HTMLInputElement>) =>
		setTargets(event.target.value as "MIN" | "MAX");
	const handleChangeWaktu = (value: string | null | undefined) =>
		setWaktus(value);
	const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) =>
		setChecked(event.target.checked);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (
		<Stack spacing={2} component="form" onSubmit={handleSubmit}>
			<FormControl fullWidth>
				<KpiAutocomplete
					search={kpis}
					setSearchValue={handleChangeKpi}
					label="KPI"
					variant="outlined"
				/>
			</FormControl>
			<FormControl fullWidth>
				<IndikatorAutocomplete
					// kpiId={
					// 	indikatorData
					// 		? indikatorData.kpi.id
					// 		: data.indikator.kpi.id
					// }
					search={indikators}
					setSearchValue={handleChangeIndikator}
					label="Indikator"
					variant="outlined"
				/>
			</FormControl>{" "}
			<FormControl fullWidth>
				<TextField
					id="uraian"
					inputRef={uraianRef}
					label="Uraian"
					defaultValue={data?.uraian ?? ""}
					multiline
					rows={4}
					required
				/>
			</FormControl>
			<FormControl fullWidth>
				<TextField
					id="volume"
					inputRef={volumeRef}
					label="Volume"
					defaultValue={data?.volume ?? 0}
					type="number"
					required
				/>
			</FormControl>
			<FormControl fullWidth>
				<TextField
					id="satuan"
					inputRef={satuanRef}
					label="Satuan"
					defaultValue={data?.satuan ?? "%"}
					required
				/>
			</FormControl>
			<FormControl fullWidth>
				<FormLabel id="target-radio-group">Target</FormLabel>
				<RadioGroup
					row
					aria-labelledby="target-radio-group"
					value={targets}
					onChange={handleChangeTarget}
				>
					<FormControlLabel
						value="MIN"
						control={<Radio />}
						label="Minimal"
					/>
					<FormControlLabel
						value="MAX"
						control={<Radio />}
						label="Maksimal"
					/>
				</RadioGroup>
			</FormControl>
			<FormControl fullWidth>
				<WaktuAutocomplete
					search={waktus}
					setSearchValue={handleChangeWaktu}
				/>
			</FormControl>
			<FormControl fullWidth>
				<TextField
					id="bobot"
					label="Bobot"
					variant="outlined"
					inputRef={bobotRef}
					defaultValue={data?.bobot ?? 0}
					type="number"
					required
				/>
			</FormControl>
			<FormControl fullWidth>
				<FormGroup>
					<FormControlLabel
						control={
							<Switch
								checked={checked}
								onChange={handleChangeChecked}
								name="status"
							/>
						}
						label="Status"
					/>
				</FormGroup>
			</FormControl>
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
				>
					<span>Save</span>
				</LoadingButton>
			</Stack>
		</Stack>
	);
};
