import TransPerilakuForm from "@components/trans/bawahan/perilaku/form";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useViewFormPerilakuDialogStore } from "@store/dialog/view.form.perilaku";
import { DialogSlideTransition } from "@components/commons/effect/transition/dialog";

const ViewFormPerilakuDialog = () => {
	const { isFormPerilakuOpen, toggleFormPerilakuOpen } =
		useViewFormPerilakuDialogStore();
	return (
		<Dialog
			open={isFormPerilakuOpen}
			onClose={() => toggleFormPerilakuOpen(null)}
			TransitionComponent={DialogSlideTransition}
			maxWidth="xs"
		>
			<DialogTitle>
				Form Perilaku Staff
				<IconButton
					edge="start"
					onClick={() => toggleFormPerilakuOpen(null)}
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
				<TransPerilakuForm />
			</DialogContent>
		</Dialog>
	);
};

export default ViewFormPerilakuDialog;
