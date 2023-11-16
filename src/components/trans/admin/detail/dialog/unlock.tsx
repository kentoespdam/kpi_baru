import { Periode } from "@helper/periode";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { TransKpi, TransKpiQKeyProps } from "@myTypes/entity/trans.kpi";
import { AcceptedStatus } from "@myTypes/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unlockKpi } from "@utils/trans/lock";
import { useSnackbar } from "notistack";
import { useRef } from "react";

type UnlockDialogProps = {
	open: boolean;
	nipam?: string;
	kpiId?: number;
	periode: Periode | null;
	handleOpen: () => void;
	lockedBy: AcceptedStatus;
	isAdmin?: boolean;
};

const UnlockDialog = (props: UnlockDialogProps) => {
	const { open, nipam, kpiId, periode, handleOpen, lockedBy } = props;
	const queryKey = [
		"kpi.admin.kinerja",
		{
			nipam: nipam,
			kpiId: kpiId,
			periode: periode?.periode,
		},
	];
	const konfirm = useRef<HTMLInputElement>();
	const qc = useQueryClient();
	const data = qc.getQueryData<TransKpi>(queryKey);
	const { enqueueSnackbar } = useSnackbar();

	const mutation = useMutation({
		mutationFn: unlockKpi,
		onError: (error) => {
			enqueueSnackbar(`${error}`, { variant: "error" });
			handleOpen();
		},
		onSuccess: () => {
			qc.invalidateQueries(queryKey);
			enqueueSnackbar("Data berhasil dibuka", { variant: "success" });
			handleOpen();
		},
	});

	const doUnlock = async () => {
		if (konfirm.current?.value !== `UNLOCK-${data?.id}`) {
			alert("Kode yang anda masukkan salah!");
			return;
		}
		mutation.mutate(Number(data?.id));
	};
	return (
		<Dialog open={open} onClose={handleOpen}>
			<DialogTitle>Unlock data?</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Jika Ingin membuka kunci data silahkan ketik kode berikut
					<br />
					<Chip
						label={`UNLOCK-${data?.id}`}
						variant="filled"
						color="error"
					/>
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="konfirm"
					variant="standard"
					inputRef={konfirm}
					placeholder="kode disini..."
					fullWidth
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleOpen}>Cancel</Button>
				<LoadingButton onClick={doUnlock} loading={mutation.isLoading}>
					UNLOCK
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
};

export default UnlockDialog;
