import { DialogSlideTransition } from "@components/commons/effect/transition/dialog";
import TransPerilakuForm from "@components/trans/bawahan/perilaku/form";
import { Periode } from "@helper/periode";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useViewFormPerilakuDialogStore } from "@store/dialog/view.form.perilaku";
import dynamic from "next/dynamic";
const CloseIcon = dynamic(() => import("@mui/icons-material/Close"));

type ViewFormPerilakuDialogProps = {
	periode: Periode | null;
	isAdmin?: boolean;
};
const ViewFormPerilakuDialog = (props: ViewFormPerilakuDialogProps) => {
	const { periode, isAdmin } = props;
	const { isFormPerilakuOpen, toggleFormPerilakuOpen, nipam } =
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
				<TransPerilakuForm
					periode={periode}
					isAdmin={isAdmin}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default ViewFormPerilakuDialog;
