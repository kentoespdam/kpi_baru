import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TransKpi, TransKpiQKeyProps } from "@myTypes/entity/trans.kpi";
import { AcceptedStatus } from "@myTypes/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { lockKpi } from "@utils/trans/lock";
import { useSnackbar } from "notistack";

type LockDialogProps = {
	open: boolean;
	lockedBy: AcceptedStatus;
	queryKey: (string | TransKpiQKeyProps)[];
	handleLockOpen: () => void;
};
const LockDialog = (props: LockDialogProps) => {
	const { open, lockedBy, queryKey, handleLockOpen } = props;
	const qc = useQueryClient();
	const data = qc.getQueryData<TransKpi>(queryKey);
	const { enqueueSnackbar } = useSnackbar();

	const mutation = useMutation({
		mutationFn: lockKpi,
		onError: (error) => {
			enqueueSnackbar(`${error}`, { variant: "error" });
			handleLockOpen();
		},
		onSuccess: () => {
			qc.invalidateQueries(queryKey);
			enqueueSnackbar("Data berhasil dikunci", { variant: "success" });
			handleLockOpen();
		},
	});

	const doLock = async () =>
		mutation.mutate({ id: Number(data?.id), lockedStatus: lockedBy });
	return (
		<Dialog open={open}>
			<DialogTitle id="kunci-data">Kunci Data?</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Apakah anda yakin ingin menutup kunci data? anda tidak dapat
					mengedit data setelah dikunci.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleLockOpen}>CANCEL</Button>
				<Button onClick={doLock}>KUNCI</Button>
			</DialogActions>
		</Dialog>
	);
};

export default LockDialog;
