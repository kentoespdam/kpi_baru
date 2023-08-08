import { DialogSlideTransition } from "@components/commons/effect/transition/dialog";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useViewFormKinerjaDialogStore } from "@store/dialog/view.form.kinerja";
import KpiKinerjaForm from "@trans/bawahan/kinerja/form";

const ViewFormKinerjaDialog = () => {
	const {
		isFormKinerjaOpen: isFormOpen,
		toggleFormKinerjaOpen: toggleFormOpen,
	} = useViewFormKinerjaDialogStore();
	return (
		<Dialog
			open={isFormOpen}
			onClose={toggleFormOpen}
			TransitionComponent={DialogSlideTransition}
			maxWidth="xs"
		>
			<DialogTitle>
				Form Kinerja Staff
				<IconButton
					edge="start"
					onClick={toggleFormOpen}
					aria-label="close"
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
					}}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<KpiKinerjaForm />
			</DialogContent>
		</Dialog>
	);
};

export default ViewFormKinerjaDialog;
