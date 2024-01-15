import { Periode } from "@helper/periode";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { TransKpi } from "@myTypes/entity/trans.kpi";
import { ACCEPTED_STATUS, AcceptedStatus } from "@myTypes/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { lockKpi } from "@utils/trans/lock";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";

type LockDialogProps = {
	open: boolean;
	nipam?: string;
	kpiId?: number;
	periode: Periode | null;
	lockedBy: AcceptedStatus;
	handleLockOpen: () => void;
	isAdmin?: boolean;
};

const LockDialog = (props: LockDialogProps) => {
	const { open, nipam, kpiId, periode, lockedBy, handleLockOpen } = props;
	const acceptedStatusRef = useRef<HTMLInputElement>();
	const [lockStatus, setLockStatus] = useState<AcceptedStatus>(lockedBy);

	const queryKey = [
		"kpi.admin.kinerja",
		{
			nipam: nipam,
			kpiId: kpiId,
			periode: periode?.periode,
		},
	];
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
		mutation.mutate({
			id: Number(data?.id),
			lockedStatus: acceptedStatusRef.current?.value as AcceptedStatus,
		});

	return (
		<Dialog open={open}>
			<DialogTitle id="kunci-data">Kunci Data?</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Apakah anda yakin ingin menutup kunci data? anda tidak dapat
					mengedit data setelah dikunci.
				</DialogContentText>
				<FormControl sx={{ mt: 1 }}>
					<InputLabel id="accepted-status">Lock Status</InputLabel>
					<Select
						labelId="accepted-status"
						id="accepted-status"
						value={lockStatus}
						label="Lock Status"
						inputRef={acceptedStatusRef}
						onChange={(e) =>
							setLockStatus(e.target.value as AcceptedStatus)
						}
					>
						<MenuItem value={ACCEPTED_STATUS.ATASAN}>
							{ACCEPTED_STATUS.ATASAN}
						</MenuItem>
						<MenuItem value={ACCEPTED_STATUS.ADMIN}>
							{ACCEPTED_STATUS.ADMIN}
						</MenuItem>
					</Select>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={handleLockOpen}
					variant="contained"
					color="error"
				>
					CANCEL
				</Button>
				<LoadingButton
					onClick={doLock}
					variant="contained"
					loading={mutation.isLoading}
				>
					KUNCI
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
};

export default LockDialog;
