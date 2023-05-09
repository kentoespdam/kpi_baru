import { ESeverity } from "@interfaces/EStatus";
import { LOCAL_URAIAN_FILE } from "@interfaces/IUraianFile";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import { useTransactionKpiStore } from "@storage/transaction/kpi.store";
import { useUploadDialogStore } from "@storage/transaction/upload.dialog.store";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { shallow } from "zustand/shallow";

const UploadForm = () => {
	const fileRef = useRef<HTMLInputElement>(null);
	const [fileName, setFileName] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const transKpiPegawai = useTransactionKpiStore(
		(state) => state.transKpiPegawai,
		shallow
	);
	const { transKpiUraianId, toggleUpload } = useUploadDialogStore(
		(state) => ({
			transKpiUraianId: state.transKpiUraianId,
			toggleUpload: state.toggleUpload,
		}),
		shallow
	);
	const setPeriode = useTransactionKpiStore(
		(state) => state.setPeriode,
		shallow
	);
	const openNotif = useNotifSnackbarStore((state) => state.openNotif);

	async function doUpload() {
		setLoading(true);
		if (fileRef.current?.files?.length === 0) {
			openNotif("File tidak boleh kosong!", ESeverity.ERROR);
			setLoading(false);
			return;
		}
		const periode = transKpiPegawai!.periode;
		const formData = new FormData();
		formData.append("file", fileRef.current!.files![0]);
		formData.append("periode", periode);
		formData.append("nipam", transKpiPegawai!.nipam);
		formData.append("transKpiUraianId", transKpiUraianId!.toString());

		try {
			const upload = await axios.post(LOCAL_URAIAN_FILE, formData, {
				headers: {
					Accept: "*/*",
					"Content-Type": "multipart/form-data",
				},
				onUploadProgress: (event) => {
					console.log(
						`Current progress:`,
						Math.round((event.loaded * 100) / event.total!)
					);
				},
			});
			if (upload) {
				setLoading(false);
				toggleUpload();
				setPeriode();
				setTimeout(() => {
					setPeriode(periode);
				}, 100);
			}
		} catch (error: any) {
			if (error.status === 400) {
				openNotif(error.response?.data.errors, ESeverity.ERROR);
			} else {
				openNotif(error.response?.data.message, ESeverity.ERROR);
			}
			setLoading(false);
		}
	}

	useEffect(() => {
		
	}, [fileName]);

	return (
		<DialogContent>
			<Stack spacing={2}>
				<IconButton
					color="primary"
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
					/>
					<UploadFileIcon sx={{ fontSize: "4.5rem" }} />
				</IconButton>
				<Typography variant="h6" align="center">
					{fileName}
				</Typography>
				<LoadingButton
					loading={loading}
					variant="contained"
					onClick={doUpload}
				>
					<span>UPLOAD</span>
				</LoadingButton>
			</Stack>
		</DialogContent>
	);
};

export default UploadForm;
