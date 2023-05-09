import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { shallow } from "zustand/shallow";
import Alert from "@mui/material/Alert";

const NotifSnackbar = () => {
	const { isOpen, message, severity, duration, closeNotif } =
		useNotifSnackbarStore(
			(state) => ({
				isOpen: state.isOpen,
				message: state.message,
				severity: state.severity,
				duration: state.duration,
				closeNotif: state.closeNotif,
			}),
			shallow
		);
	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") return;
		closeNotif();
	};

	const action = (
		<React.Fragment>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	const vertical = "top";
	const horizontal = "center";

	return (
		<Snackbar
			open={isOpen}
			autoHideDuration={duration}
			onClose={closeNotif}
			message={message}
			action={action}
			anchorOrigin={{ vertical, horizontal }}
		>
			<Alert onClose={handleClose} severity={severity}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default NotifSnackbar;
