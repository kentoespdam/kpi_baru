"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LoadingButton from "@mui/lab/LoadingButton";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useSessionStore } from "@store/main/session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doUpload } from "@utils/trans/file";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { FormEvent, useRef, useState } from "react";

type TransKpiStaffUploadComponentProps = {
	uraianId: number;
};
const TransKpiStaffUploadComponent = (
	props: TransKpiStaffUploadComponentProps
) => {
	const { uraianId } = props;
	const { periode, bridgeKpi } = useTransKpiStore();
	const user = useSessionStore.getState().user;
	const { enqueueSnackbar } = useSnackbar();
	const router = useRouter();
	const qc = useQueryClient();

	const fileRef = useRef<HTMLInputElement>(null);
	const [fileName, setFileName] = useState<string>("");
	const [loading, setLoading] = useState(false);

	const mutation = useMutation({
		mutationFn: doUpload,
		onError: (error) => {
			enqueueSnackbar(`${error}`, { variant: "error" });
		},
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [
					"trans.kpi.staff",
					{
						nipam: user!.userId,
						kpiId: bridgeKpi!.id,
						periode: periode!.periode,
					},
				],
			});
			enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
			router.push("/trans/kpi");
		},
	});

	const handleDelete = () => {
		setFileName("");
	};
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData();
		formData.set("periode", String(periode?.periode));
		formData.set("nipam", String(user?.userId));
		formData.set("transKpiUraianId", String(uraianId));
		formData.set("file", fileRef.current!.files![0]);
		mutation.mutate(formData);
	};
	return (
		<Stack
			spacing={1}
			alignContent="center"
			alignItems="center"
			component="form"
			onSubmit={handleSubmit}
		>
			<IconButton
				sx={{
					width: "100%",
					height: "125px",
					display: fileName.length > 0 ? "none" : undefined,
				}}
				aria-label="upload picture"
				component="label"
				size="large"
			>
				<input
					ref={fileRef}
					hidden
					type="file"
					onChange={() =>
						setFileName(fileRef.current!.files![0].name)
					}
					accept={`${process.env.NEXT_PUBLIC_ACCEPT_EXTENSION_TYPE}`}
				/>
				<Stack alignContent="center" alignItems="center" spacing={1}>
					<UploadFileIcon sx={{ fontSize: "4.5rem" }} />
					Klik disini untuk memilih file
					<br />
				</Stack>
			</IconButton>

			<Chip
				label={fileName}
				onDelete={handleDelete}
				deleteIcon={
					<IconButton type="reset">
						<DeleteIcon />
					</IconButton>
				}
				variant="outlined"
				sx={{ display: fileName.length > 0 ? undefined : "none" }}
			/>
			<LoadingButton
				loading={loading}
				variant="contained"
				type="submit"
				sx={{ display: fileName.length > 0 ? undefined : "none" }}
			>
				<span>UPLOAD</span>
			</LoadingButton>
		</Stack>
	);
};

export default TransKpiStaffUploadComponent;
