"use client";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useViewUploadDialogStore } from "@store/dialog/view.upload";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useSessionStore } from "@store/main/session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doUpload } from "@utils/trans/file";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
import { FormEvent, useRef, useState } from "react";

const DeleteIcon = dynamic(() => import("@mui/icons-material/Delete"));
const UploadFileIcon = dynamic(() => import("@mui/icons-material/UploadFile"));
const LoadingButton = dynamic(() => import("@mui/lab/LoadingButton"));
const Chip = dynamic(() => import("@mui/material/Chip"));

type TransKpiStaffUploadComponentProps = {
	uraianId: number;
};
const TransKpiStaffUploadComponent = (
	props: TransKpiStaffUploadComponentProps
) => {
	const { uraianId } = props;
	const { periode, bridgeKpi: bridgeKpi } = useTransKpiStore();
	const userId = useSessionStore.getState().user?.userId;
	const { enqueueSnackbar } = useSnackbar();
	const qc = useQueryClient();

	const fileRef = useRef<HTMLInputElement>(null);
	const [fileName, setFileName] = useState<string>("");
	const toggleViewUploadOpen = useViewUploadDialogStore(
		(state) => state.toggleViewUploadOpen
	);

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
						nipam: String(userId),
						kpiId: Number(bridgeKpi?.kpi.id),
						periode: Number(periode?.periode),
					},
				],
			});
			enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
			toggleViewUploadOpen();
			setFileName("");
		},
	});

	const handleDelete = () => setFileName("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData();
		formData.set("periode", String(periode?.periode));
		formData.set("nipam", String(userId));
		formData.set("transKpiUraianId", String(uraianId));
		formData.set("file", fileRef.current!.files![0]);
		mutation.mutate({
			periode: Number(periode?.periode),
			nipam: String(userId),
			transKpiUraianId: Number(uraianId),
			file: fileRef.current!.files![0],
		});
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
					name="file"
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
				loading={mutation.isLoading}
				variant="contained"
				type="submit"
				sx={{ display: fileName.length > 0 ? undefined : "none" }}
			>
				<span>UPLOAD</span>
			</LoadingButton>
			<input type="hidden" name="periode" value={periode?.periode} />
			<input type="hidden" name="nipam" value={userId} />
			<input type="hidden" name="transKpiUraianId" value={uraianId} />
		</Stack>
	);
};

export default TransKpiStaffUploadComponent;
