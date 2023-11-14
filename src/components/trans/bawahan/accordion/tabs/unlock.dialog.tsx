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
	handleOpen: () => void;
	queryKey: (string | TransKpiQKeyProps)[];
	lockedBy: AcceptedStatus;
};
const UnlockDialog = (props: UnlockDialogProps) => {
	const { open, handleOpen, queryKey, lockedBy } = props;
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
					<Chip label={`UNLOCK-${data?.id}`} variant="outlined" />
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
				<Button onClick={doUnlock}>UNLOCK</Button>
			</DialogActions>
		</Dialog>
	);
};

export default UnlockDialog;
