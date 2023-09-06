import { DialogSlideTransition } from "@components/commons/effect/transition/dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useViewFormPerilakuDialogStore } from "@store/dialog/view.form.perilaku";
import dynamic from "next/dynamic";

const TransPerilakuForm = dynamic(
	() => import("@components/trans/bawahan/perilaku/form")
);
const Dialog = dynamic(() => import("@mui/material/Dialog"));
const DialogContent = dynamic(() => import("@mui/material/DialogContent"));
const IconButton = dynamic(() => import("@mui/material/IconButton"));
const CloseIcon = dynamic(() => import("@mui/icons-material/Close"));

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
