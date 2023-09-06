import { DialogSlideTransition } from "@components/commons/effect/transition/dialog";
import { useViewFormKinerjaDialogStore } from "@store/dialog/view.form.kinerja";
import dynamic from "next/dynamic";

const CloseIcon = dynamic(() => import("@mui/icons-material/Close"));
const Dialog = dynamic(() => import("@mui/material/Dialog"));
const DialogContent = dynamic(() => import("@mui/material/DialogContent"));
const DialogTitle = dynamic(() => import("@mui/material/DialogTitle"));
const IconButton = dynamic(() => import("@mui/material/IconButton"));
const KpiKinerjaForm = dynamic(() => import("@trans/bawahan/kinerja/form"));

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
